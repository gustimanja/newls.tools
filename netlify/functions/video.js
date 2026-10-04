// MP4 Downloader (TikTok) lewat layanan pihak ketiga tikwm.com
const { json } = require('./_util');

exports.handler = async (event) => {
  const url = (event.queryStringParameters || {}).url;
  if (!url) return json(400, { error: 'Parameter url wajib diisi.' });
  if (/instagram\.com/i.test(url))
    return json(501, { error: 'Instagram Reels belum didukung. Saat ini hanya TikTok.' });
  if (!/tiktok\.com/i.test(url))
    return json(400, { error: 'Link harus dari TikTok.' });
  try {
    const r = await fetch('https://www.tikwm.com/api/?hd=1&url=' + encodeURIComponent(url));
    const j = await r.json();
    if (j.code !== 0 || !j.data) return json(502, { error: j.msg || 'Video tidak ditemukan.' });
    let link = j.data.hdplay || j.data.play;
    if (link && link.startsWith('/')) link = 'https://www.tikwm.com' + link;
    if (!link) return json(502, { error: 'Link video tidak tersedia.' });
    return json(200, { result: link, title: j.data.title });
  } catch (e) {
    return json(502, { error: 'Layanan downloader tidak merespons.' });
  }
};
