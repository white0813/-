# COVER STUDIO

A Next.js starter for a public, no-login AI thumbnail generator.

## Included
- Traditional Chinese responsive interface
- Topic, platform, style and optional reference image input
- Two distinct image concepts per generation
- Server-side OpenAI Images API calls (API key is never sent to the browser)
- PNG downloads

## Deploy to Vercel
1. Upload this folder to a new GitHub repository (or create a repository and upload all files).
2. In Vercel, choose **Add New → Project**, import that GitHub repository, and deploy.
3. In the Vercel project, open **Settings → Environment Variables**.
4. Add `OPENAI_API_KEY` with your OpenAI API key. Optionally set `OPENAI_IMAGE_MODEL` to a model available to your API project; default is `gpt-image-2`.
5. Redeploy after adding the environment variable.

## Important before sharing publicly
This is a working starter, not a hardened public service. It currently has no persistent daily quota, CAPTCHA, durable rate limiting, privacy policy, or terms page. Add those before promoting the site widely. A no-login public endpoint can incur API costs. Set an OpenAI project budget/usage alerts and monitor Vercel usage. Never expose `OPENAI_API_KEY` in client-side code.

Reference-image edits use the OpenAI Images API `/v1/images/edits`; text-only requests use `/v1/images/generations`. Model availability and API billing depend on your OpenAI API project.
