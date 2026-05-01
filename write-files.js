const fs = require('fs');

const transactionController = `const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1),
  note: z.string().optional(),
  date: z.string().optional(),
});

const createTransaction = async (req, res) => {
  const result = transactionSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors });
  const { amount, type, category, note, date } = result.data;
  const transaction = await prisma.transaction.create({
    data: { amount, type, category, note, date: date ? new Date(date) : new Date(), userId: req.user.userId },
  });
  res.status(201).json(transaction);
};

const getTransactions = async (req, res) => {
  const { type, category } = req.query;
  const filters = { userId: req.user.userId };
  if (type) filters.type = type;
  if (category) filters.category = category;
  const transactions = await prisma.transaction.findMany({ where: filters, orderBy: { date: 'desc' } });
  res.json(transactions);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction || transaction.userId !== req.user.userId) return res.status(404).json({ error: 'Transaction not found' });
  await prisma.transaction.delete({ where: { id } });
  res.json({ message: 'Transaction deleted' });
};

const getSummary = async (req, res) => {
  const transactions = await prisma.transaction.findMany({ where: { userId: req.user.userId } });
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  res.json({ income, expenses, balance: income - expenses });
};

module.exports = { createTransaction, getTransactions, deleteTransaction, getSummary };`;

fs.writeFileSync('./src/controllers/transaction.controller.js', transactionController);
console.log('transaction.controller.js written successfully');