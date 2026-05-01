const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { createBudget, getBudgets, checkBudget } = require('../controllers/budget.controller');

router.use(auth);

router.post('/', createBudget);
router.get('/', getBudgets);
router.get('/check', checkBudget);

module.exports = router;