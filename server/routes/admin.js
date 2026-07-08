const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

// --- Brute-force protection ---
const MAX_ATTEMPTS  = 3;
const LOCKOUT_MS    = 5 * 60 * 1000; // 5 minutes

// Map<ip, { count: number, lockedUntil: number|null }>
const loginAttempts = new Map();

function getAttemptRecord(ip) {
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 0, lockedUntil: null });
  }
  return loginAttempts.get(ip);
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const record = getAttemptRecord(ip);

  // Check if currently locked out
  if (record.lockedUntil && Date.now() < record.lockedUntil) {
    const retryAfter = Math.ceil((record.lockedUntil - Date.now()) / 1000);
    return res.status(429).json({
      success: false,
      message: `Too many failed attempts. Try again in ${retryAfter} seconds.`,
      retryAfter,
      locked: true,
    });
  }

  // Reset lockout if it has expired
  if (record.lockedUntil && Date.now() >= record.lockedUntil) {
    record.count = 0;
    record.lockedUntil = null;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    record.count += 1;
    const attemptsLeft = MAX_ATTEMPTS - record.count;

    if (attemptsLeft <= 0) {
      record.lockedUntil = Date.now() + LOCKOUT_MS;
      return res.status(429).json({
        success: false,
        message: 'Too many failed attempts. Account locked for 5 minutes.',
        retryAfter: Math.ceil(LOCKOUT_MS / 1000),
        locked: true,
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
      attemptsLeft,
    });
  }

  // Successful login — clear attempt record
  loginAttempts.delete(ip);

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ success: true, token });
});

// POST /api/admin/verify  — check if token is still valid
router.post('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token' });
  }
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    res.json({ success: true, admin: decoded });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
