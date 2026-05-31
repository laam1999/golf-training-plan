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
  // Try every ```json / ``` block in the response (Claude sometimes outputs
  // the schema template AND the filled-in plan as two separate blocks).
  // We want the block that actually parses as a valid plan, not a placeholder.
  const fenceRe = /```(?:json)?\s*([\s\S]+?)```/g;
  let match;
  while ((match = fenceRe.exec(text)) !== null) {
    try {
      const candidate = JSON.parse(match[1].trim());
      if (candidate && Array.isArray(candidate.phases) && candidate.phases.length > 0) {
        return candidate;
      }
    } catch { /* try next block */ }
  }
  // Fallback: find the largest {...} object in the text (no code fence used)
  const objMatch = text.match(/\{[\s\S]*"phases"[\s\S]*\}/);
  if (objMatch) {
    try {
      const candidate = JSON.parse(objMatch[0]);
      if (candidate && Array.isArray(candidate.phases) && candidate.phases.length > 0) {
        return candidate;
      }
    } catch { /* not valid JSON */ }
  }
  return null;
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
      console.error('extractPlan failed. stop_reason:', data.stop_reason, '\nRaw output (first 800 chars):\n', rawText.slice(0, 800));
      // Surface stop_reason to client so we can distinguish truncation vs bad format
      if (data.stop_reason === 'max_tokens') {
        return res.status(500).json({ error: 'The plan was too long to generate in one go. Please try again — it usually works on the second attempt.' });
      }
      return res.status(500).json({ error: 'Plan generation returned an unexpected format. Please try again.' });
    }

    plan.generatedAt = new Date().toISOString();

    return res.status(200).json({ plan, stop_reason: data.stop_reason });

  } catch (err) {
    console.error('Generate plan error:', err.message);
    return res.status(500).json({ error: 'Server error generating plan. Please try again.' });
  }
}
