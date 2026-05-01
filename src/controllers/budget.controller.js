const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

const budgetSchema = z.object({
  category: z.string().min(1),
  limit: z.number().positive(),
  month: z.string().min(1),
});

const createBudget = async (req, res) => {
  const result = budgetSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { category, limit, month } = result.data;

  const budget = await prisma.budget.create({
    data: { category, limit, month, userId: req.user.userId },
  });

  res.status(201).json(budget);
};

const getBudgets = async (req, res) => {
  const budgets = await prisma.budget.findMany({
    where: { userId: req.user.userId },
  });

  res.json(budgets);
};

const checkBudget = async (req, res) => {
  const { month } = req.query;

  const budgets = await prisma.budget.findMany({
    where: { userId: req.user.userId, month },
  });

  const transactions = await prisma.transaction.findMany({
    where: { userId: req.user.userId, type: 'expense' },
  });

  const report = budgets.map(budget => {
    const spent = transactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: budget.category,
      limit: budget.limit,
      spent,
      remaining: budget.limit - spent,
      overBudget: spent > budget.limit,
    };
  });

  res.json(report);
};

module.exports = { createBudget, getBudgets, checkBudget };