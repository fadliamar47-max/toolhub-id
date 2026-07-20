export async function onRequestPost({ request, env }) {
  try {
    const payload = await request.json();
    const prompt = String(payload?.prompt || '').trim();
    if (!prompt) return Response.json({ error: 'Prompt kosong' }, { status: 400 });

    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'OPENAI_API_KEY belum diset di Cloudflare Pages' }, { status: 500 });
    }

    const model = env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
    const size = payload?.size || '1024x1024';

    const imgRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        size,
        n: 1
      })
    });

    if (!imgRes.ok) {
      const errText = await imgRes.text();
      return new Response(errText, { status: imgRes.status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    const data = await imgRes.json();
    const item = data?.data?.[0] || data?.[0];
    if (!item) return Response.json({ error: 'Empty image response' }, { status: 500 });

    if (item.b64_json) {
      const bytes = Uint8Array.from(atob(item.b64_json), c => c.charCodeAt(0));
      return new Response(bytes, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': 'attachment; filename="thumbnail.png"',
          'Cache-Control': 'no-store'
        }
      });
    }

    if (item.url) {
      const remote = await fetch(item.url);
      const blob = await remote.arrayBuffer();
      return new Response(blob, {
        headers: {
          'Content-Type': remote.headers.get('content-type') || 'image/png',
          'Content-Disposition': 'attachment; filename="thumbnail.png"',
          'Cache-Control': 'no-store'
        }
      });
    }

    return Response.json({ error: 'No image data returned' }, { status: 500 });
  } catch (err) {
    return Response.json({ error: err?.message || 'Thumbnail generation failed' }, { status: 500 });
  }
}
