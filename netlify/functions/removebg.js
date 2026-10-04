// Remove Background lewat remove.bg (butuh env REMOVEBG_API_KEY)
const { json } = require('./_util');

exports.handler = async (event) => {
  const url = (event.queryStringParameters || {}).url;
  const key = process.env.REMOVEBG_API_KEY;
  if (!url) return json(400, { error: 'Parameter url wajib diisi.' });
  if (!key) return json(501, { error: 'REMOVEBG_API_KEY belum diatur di Netlify.' });
  try {
    const fd = new FormData();
    fd.append('image_url', url);
    fd.append('size', 'auto');
    const r = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': key },
      body: fd,
    });
    if (!r.ok) return json(502, { error: 'remove.bg membalas ' + r.status + '. Cek link gambar / kuota.' });
    const buf = Buffer.from(await r.arrayBuffer());
    return json(200, { result: 'data:image/png;base64,' + buf.toString('base64') });
  } catch (e) {
    return json(502, { error: 'Layanan remove.bg tidak merespons.' });
  }
};
