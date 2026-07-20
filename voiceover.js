export async function onRequestPost({ request, env }) {
  try {
    const payload = await request.json();
    const text = String(payload?.text || '').trim();
    if (!text) return Response.json({ error: 'Text kosong' }, { status: 400 });

    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'OPENAI_API_KEY belum diset di Cloudflare Pages' }, { status: 500 });
    }

    const model = env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
    const voice = payload?.voice || 'alloy';
    const speed = Number(payload?.speedValue || 1.0);

    const ttsRes = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice,
        input: text,
        format: 'mp3',
        speed
      })
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      return new Response(errText, { status: ttsRes.status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    const audioBytes = await ttsRes.arrayBuffer();
    return new Response(audioBytes, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="voiceover.mp3"',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return Response.json({ error: err?.message || 'Voiceover generation failed' }, { status: 500 });
  }
}
