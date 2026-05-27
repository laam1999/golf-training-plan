// Vercel serverless function — runs on Vercel's servers, NOT in the user's browser.
// The Anthropic API key lives here as an environment variable, never exposed.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Basic CORS headers (allows the frontend to call this endpoint)
  res.setHeader('Content-Type', 'application/json');

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid prompt.' });
    }

    // Safety check — reject anything too short (likely abuse)
    if (prompt.length < 100) {
      return res.status(400).json({ error: 'Prompt too short.' });
    }

    // Safety check — reject anything way too long (could be abuse)
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
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await anthropicResp.json();

    if (!anthropicResp.ok) {
      // Return a safe error message — don't leak internal details
      const message = data?.error?.message || 'Plan generation failed.';
      return res.status(anthropicResp.status).json({ error: message });
    }

    // Pass the successful response back to the frontend
    return res.status(200).json(data);

  } catch (err) {
    console.error('Generate plan error:', err);
    return res.status(500).json({ error: 'Server error generating plan. Please try again.' });
  }
}
