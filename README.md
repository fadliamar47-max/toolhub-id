# CreatorSuite Pro – Cloudflare Pages

## Deploy
1. Upload `index.html` and the `functions/` folder to Cloudflare Pages.
2. Set environment variable:
   - `OPENAI_API_KEY`
3. Optional:
   - `OPENAI_TTS_MODEL`
   - `OPENAI_IMAGE_MODEL`

## API routes
- `POST /api/research`
- `POST /api/voiceover`
- `POST /api/thumbnail`

## What changed
- Script generator now pulls internet-backed facts from DuckDuckGo + Wikipedia.
- Thumbnail generator now exports real PNG previews directly in the browser.
- Voiceover generator now downloads MP3 when the Cloudflare function is configured.
