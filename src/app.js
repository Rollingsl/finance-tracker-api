const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://finance-tracker-ui-mauve.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));
app.use('/api/budgets', require('./routes/budget.routes'));
app.use('/api/profile', require('./routes/profile.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API is running' });
});

app.use(errorHandler);

module.exports = app;