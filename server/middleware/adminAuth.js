const jwt = require('jsonwebtoken');

module.exports = function adminAuth(req, res, next) {
  // Support both JWT token (new) and legacy admin-key header (fallback)
  const authHeader = req.headers['authorization'];
  const legacyKey  = req.headers['admin-key'];

  // Legacy key check
  if (legacyKey && legacyKey === process.env.ADMIN_SECRET) {
    return next();
  }

  // JWT check
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
