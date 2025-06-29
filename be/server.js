const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const transactionsRoutes = require('./routes/transactions');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Route Prefix
app.use('/api', authRoutes);
app.use('/api', transactionsRoutes);

// Hanya panggil app.listen satu kali
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Global error handler (optional tapi berguna)
process.on('uncaughtException', function (err) {
  console.error('UNCAUGHT EXCEPTION:', err);
});
