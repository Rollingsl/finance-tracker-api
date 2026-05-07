const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  getSummary,
  updateTransaction,
} = require('../controllers/transaction.controller');

router.use(auth);

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/summary', getSummary);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;