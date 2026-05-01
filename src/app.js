const express = require('express');
const errorHandler = require('./middleware/error.middleware');
const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));
app.use('/api/budgets', require('./routes/budget.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API is running' });
});

app.use(errorHandler);

module.exports = app;