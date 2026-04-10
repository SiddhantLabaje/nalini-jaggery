require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./config/db');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'Server is running' })
);

// API routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Serve frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ FINAL FIX (NO ERRORS)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
