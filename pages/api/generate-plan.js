// Vercel serverless function — runs on Vercel's servers, NOT in the user's browser.
// The Anthropic API key lives here as an environment variable, never exposed.

const RATE_LIMIT = 3;
const WINDOW_SECS = 24 * 60 * 60; // 24 hours

// ── Persistent rate limiting via Upstash Redis REST API ───────────────────────
// Falls back to allowing the request if Redis isn't configured (dev/local).
async function isRateLimited(ip) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Redis not configured — skip rate limiting (safe for local dev)
    return false;
  }

  const key = `rl:${ip}`;

  try {
    // Increment the counter for this IP
    const incrResp = await fetch(`${url}/incr/${key}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const { result: count } = await incrResp.json();

    // On first request, set a 24-hour expiry
    if (count === 1) {
      await fetch(`${url}/expire/${key}/${WINDOW_SECS}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    return count > RATE_LIMIT;
  } catch (err) {
    // If Redis is unreachable, fail open (don't block users)
    console.warn('Rate limit check failed:', err.message);
    return false;
  }
}

function extractPlan(text) {
  try {
    // Strip ```json ... ``` or ``` ... ``` fences if present
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const json = fenced ? fenced[1].trim() : text.trim();
    const plan = JSON.parse(json);
    if (!plan.version || !Array.isArray(plan.phases) || plan.phases.length !== 3) return null;
    return plan;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  res.setHeader('Content-Type', 'application/json');

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';

  if (await isRateLimited(ip)) {
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

    const rawText = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const plan = extractPlan(rawText);

    if (!plan) {
      console.error('JSON parse failed. Raw output:\n', rawText.slice(0, 500));
      return res.status(500).json({ error: 'Plan generation returned an unexpected format. Please try again.' });
    }

    plan.generatedAt = new Date().toISOString();

    return res.status(200).json({ plan, stop_reason: data.stop_reason });

  } catch (err) {
    console.error('Generate plan error:', err.message);
    return res.status(500).json({ error: 'Server error generating plan. Please try again.' });
  }
}
