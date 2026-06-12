require('dotenv').config();
const express = require('express');
const cors    = require('cors');

require('./config/db');

const app = express();

// CORS — allow Vercel frontend + localhost for dev
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,           // e.g. https://nalinijaggery.vercel.app
  'https://www.nalinijaggery.com',
  'https://nalinijaggery.com',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (curl, Postman, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

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
app.use('/api/admin',    require('./routes/admin'));
app.use('/api/leads',    require('./routes/leads'));
app.use('/api/quotes',   require('./routes/quotes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders',   require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
