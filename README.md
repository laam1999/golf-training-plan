# GolfGains

AI-powered personalized 12-week golf training plans. Built by Luis Acosta.

## Structure

- `app/` — Next.js landing page (marketing site)
- `components/landing/` — Landing page sections
- `components/ui/` — shadcn/ui components
- `public/plan.html` — The questionnaire + result page (served at `/plan.html`)
- `pages/api/generate-plan.js` — Serverless function that calls the Anthropic API securely
- `pages/api/save-email.js` — Serverless function that emails the plan via Resend

## Environment Variables

Set these in Vercel's environment variables (never commit keys):

- `ANTHROPIC_API_KEY` — for plan generation
- `RESEND_API_KEY` — for emailing plans
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — for persistent rate limiting

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the landing page and `http://localhost:3000/plan.html` for the questionnaire.
