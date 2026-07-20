export async function onRequestPost({ request }) {
  try {
    const { query, lang = 'id' } = await request.json();
    const q = String(query || '').trim();
    if (!q) return Response.json({ error: 'Query kosong' }, { status: 400 });

    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1&kl=${lang === 'id' ? 'id-id' : 'us-en'}`;
    const ddgRes = await fetch(ddgUrl);
    const ddg = await ddgRes.json();

    const facts = [];
    const sources = [];
    if (ddg?.AbstractText) facts.push(ddg.AbstractText);
    if (ddg?.Heading && ddg?.AbstractText) facts.push(`${ddg.Heading}: ${ddg.AbstractText}`);
    if (ddg?.AbstractURL) sources.push({ title: ddg.Heading || 'DuckDuckGo Summary', url: ddg.AbstractURL });

    try {
      const wikiSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`;
      const wikiSearchRes = await fetch(wikiSearchUrl);
      const wikiSearch = await wikiSearchRes.json();
      const first = wikiSearch?.query?.search?.[0];
      if (first?.title) {
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(first.title)}`;
        const summaryRes = await fetch(summaryUrl, { headers: { 'accept': 'application/json' } });
        if (summaryRes.ok) {
          const summary = await summaryRes.json();
          if (summary?.extract) facts.push(summary.extract);
          sources.push({ title: summary?.title || first.title, url: summary?.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(first.title.replace(/ /g, '_'))}` });
        }
      }
    } catch {}

    const dedupFacts = [...new Set(facts.map(s => String(s).trim()).filter(Boolean))].slice(0, 6);
    return Response.json({
      query: q,
      facts: dedupFacts,
      sources,
      primaryKeyword: q.toLowerCase(),
      secondaryKeyword: `${q.toLowerCase()} fakta`,
      ctrScore: dedupFacts.length >= 2 ? '8.8/10' : '7.2/10',
      hook: dedupFacts[0] ? `Fakta menarik tentang ${q} sering luput dari perhatian.` : `Kamu mungkin belum sadar seberapa besar topik ${q}.`
    });
  } catch (err) {
    return Response.json({ error: err?.message || 'Research failed' }, { status: 500 });
  }
}
