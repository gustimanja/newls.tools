// AI Chat lewat Pollinations (tanpa API key)
const { json } = require('./_util');

exports.handler = async (event) => {
  const prompt = (event.queryStringParameters || {}).prompt;
  if (!prompt) return json(400, { error: 'Parameter prompt wajib diisi.' });
  try {
    const r = await fetch('https://text.pollinations.ai/' + encodeURIComponent(prompt.slice(0, 1500)));
    if (!r.ok) return json(502, { error: 'Layanan AI membalas ' + r.status });
    return json(200, { result: await r.text() });
  } catch (e) {
    return json(502, { error: 'Layanan AI tidak merespons.' });
  }
};
