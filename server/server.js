require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./config/db');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Server is running' }));

app.use('/api/admin', require('./routes/admin'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

const path = require('path');

const PORT = process.env.PORT || 5000;

// Serve frontend in production (or generally serve the built dist folder if it exists)
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
