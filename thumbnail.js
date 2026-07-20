export async function onRequestPost({ request, env }) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type"
  };

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });

  let body = {};
  try { body = await request.json(); } catch {}
  const title = String(body.title || "").trim();
  const style = String(body.style || "Cinematic").trim();

  if (!title) {
    return new Response(JSON.stringify({ error: "Title kosong" }), { status: 400, headers });
  }

  const prompt = `${title}, YouTube thumbnail, high contrast, click-worthy, ${style}`;

  return new Response(JSON.stringify({
    ready: true,
    prompt,
    concepts: [
      { overlay: "WOW!", prompt: `${prompt}, shocked expression, bold red-black-white palette` },
      { overlay: "RAHASIA", prompt: `${prompt}, investigative layout, neon accents, split screen` },
      { overlay: "3 FAKTA", prompt: `${prompt}, big number text, clean modern composition` }
    ]
  }), { status: 200, headers });
}
