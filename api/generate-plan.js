// Vercel serverless function — runs on Vercel's servers, NOT in the user's browser.
// The Anthropic API key lives here as an environment variable, never exposed.

// ── Rate limiting (in-memory) ──────────────────────────────────────────────────
// Resets on server cold starts — good enough to block casual abuse.
const RATE_LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000;
const ipLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (ipLog.get(ip) || []).filter(t => t > cutoff);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  ipLog.set(ip, timestamps);
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  res.setHeader('Content-Type', 'application/json');

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'You have reached the limit of 3 plans per 24 hours. Please come back tomorrow!' });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid prompt.' });
    }

    if (prompt.length < 100) {
      return res.status(400).json({ error: 'Prompt too short.' });
    }

    if (prompt.length > 10000) {
      return res.status(400).json({ error: 'Prompt too long.' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Server is not configured. API key missing.' });
    }

    const anthropicResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await anthropicResp.json();

    if (!anthropicResp.ok) {
      const message = data?.error?.message || 'Plan generation failed.';
      return res.status(anthropicResp.status).json({ error: message });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Generate plan error:', err.message);
    return res.status(500).json({ error: 'Server error generating plan. Please try again.' });
  }
}
