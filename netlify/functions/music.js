const { json } = require('./_util');
exports.handler = async () => json(501, { error: 'Tool ini belum tersedia.' });
