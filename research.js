export async function onRequestPost({ request }) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {}

  const query = String(body.query || "").trim();
  const lang = String(body.lang || "id").toLowerCase();

  if (!query) {
    return new Response(JSON.stringify({ error: "Query kosong" }), { status: 400, headers });
  }

  const encode = encodeURIComponent(query);
  const ddgUrl = `https://api.duckduckgo.com/?q=${encode}&format=json&no_html=1&skip_disambig=1&kl=${lang === "id" ? "id-id" : "us-en"}`;
  const wikiTitle = query.replace(/\s+/g, "%20");

  const facts = [];
  const sources = [];

  try {
    const ddg = await fetch(ddgUrl, { headers: { "accept": "application/json" } });
    if (ddg.ok) {
      const data = await ddg.json();
      if (data?.AbstractText) facts.push(data.AbstractText);
      if (data?.Answer) facts.push(data.Answer);
      const topics = Array.isArray(data?.RelatedTopics) ? data.RelatedTopics : [];
      for (const t of topics.slice(0, 8)) {
        if (t?.Text) facts.push(t.Text);
      }
      if (data?.Heading) sources.push({ title: `DuckDuckGo: ${data.Heading}`, url: `https://duckduckgo.com/?q=${encode}` });
    }
  } catch {}

  try {
    const wiki = await fetch(`https://${lang === "id" ? "id" : "en"}.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`, {
      headers: { "accept": "application/json" }
    });
    if (wiki.ok) {
      const data = await wiki.json();
      if (data?.extract) facts.push(data.extract);
      if (data?.content_urls?.desktop?.page) sources.push({ title: `Wikipedia: ${data.title || query}`, url: data.content_urls.desktop.page });
    }
  } catch {}

  const cleanFacts = [...new Set(facts.map(v => String(v).trim()).filter(Boolean))].slice(0, 6);

  const result = {
    query,
    lang,
    hook: lang === "id"
      ? `Yang menarik dari ${query} adalah ada detail yang sering dilewatkan.`
      : `What makes ${query} interesting is the detail people often miss.`,
    primaryKeyword: query,
    secondaryKeyword: `${query} guide`,
    ctrScore: cleanFacts.length >= 3 ? "8.7/10" : "8.1/10",
    facts: cleanFacts.length ? cleanFacts : [
      lang === "id"
        ? `Gunakan sudut pandang yang fokus pada konteks, bukan hanya definisi ${query}.`
        : `Use a context-first angle rather than only defining ${query}.`
    ],
    sources: sources.length ? sources : [{ title: "Fallback search", url: `https://www.google.com/search?q=${encode}` }]
  };

  return new Response(JSON.stringify(result), { status: 200, headers });
}
