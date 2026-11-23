module.exports = async (req, res) => {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse request body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // Keep as string
    }
  }

  const prompt = String((body || {}).prompt || '').slice(0, 10000);
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!anthropicKey && !geminiKey && !openAiKey) {
    return res.status(500).json({
      error: 'No AI API key configured. Set ANTHROPIC_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY in your environment variables.'
    });
  }

  const extractJson = (text) => {
    let clean = String(text || '').trim();
    clean = clean.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      clean = clean.substring(start, end + 1);
    }
    return JSON.parse(clean);
  };

  try {
    // 1. Anthropic Claude (Primary if ANTHROPIC_API_KEY provided)
    if (anthropicKey) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!r.ok) {
        const errText = await r.text();
        throw new Error(`Anthropic API error (${r.status}): ${errText}`);
      }

      const d = await r.json();
      const rawText = (d.content || []).map((c) => c.text || '').join('');
      const parsed = extractJson(rawText);
      return res.status(200).json(parsed);
    }

    // 2. Google Gemini (if GEMINI_API_KEY provided)
    if (geminiKey) {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      if (!r.ok) {
        const errText = await r.text();
        throw new Error(`Gemini API error (${r.status}): ${errText}`);
      }

      const d = await r.json();
      const rawText =
        d.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
      const parsed = extractJson(rawText);
      return res.status(200).json(parsed);
    }

    // 3. OpenAI (if OPENAI_API_KEY provided)
    if (openAiKey) {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });

      if (!r.ok) {
        const errText = await r.text();
        throw new Error(`OpenAI API error (${r.status}): ${errText}`);
      }

      const d = await r.json();
      const rawText = d.choices?.[0]?.message?.content || '';
      const parsed = extractJson(rawText);
      return res.status(200).json(parsed);
    }
  } catch (err) {
    console.error('Simulation error:', err.message);
    return res.status(502).json({
      error: 'AI analysis failed',
      details: err.message
    });
  }
};
