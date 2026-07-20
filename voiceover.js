export async function onRequestPost({ request, env }) {
  const headers = {
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

  const text = String(body.text || "").trim();
  if (!text) return new Response(JSON.stringify({ error: "Text kosong" }), { status: 400, headers: { ...headers, "content-type": "application/json" } });

  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: "OPENAI_API_KEY belum di-set. Endpoint voiceover siap dipakai setelah key diisi di Cloudflare.",
      ready: false
    }), {
      status: 501,
      headers: { ...headers, "content-type": "application/json" }
    });
  }

  const payload = {
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: text.slice(0, 4000),
    format: "mp3"
  };

  const resp = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const textErr = await resp.text();
    return new Response(JSON.stringify({ error: textErr }), { status: resp.status, headers: { ...headers, "content-type": "application/json" } });
  }

  return new Response(resp.body, {
    status: 200,
    headers: {
      ...headers,
      "content-type": "audio/mpeg",
      "cache-control": "no-store"
    }
  });
}
