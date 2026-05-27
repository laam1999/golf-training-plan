# Golf Training Plan Generator

AI-powered personalized 12-week golf training plans. Built by Luis Acosta.

## Structure

- `index.html` — The frontend (the questionnaire and result page)
- `api/generate-plan.js` — Serverless function that calls Anthropic API securely

## Environment Variables

The Anthropic API key must be set as `ANTHROPIC_API_KEY` in Vercel's environment variables. Never commit the key to GitHub.

## Local Development

This app requires the Vercel serverless function to work. To run locally, use Vercel CLI (`vercel dev`). Otherwise, deploy to Vercel for full functionality.
