const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, fullName: true, phone: true, email: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const schema = z.object({
      fullName: z.string().min(2).optional(),
      phone: z.string().min(10).optional(),
    });
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors });

    const { fullName, phone } = result.data;
    const updated = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        ...(fullName && { fullName }),
        ...(phone && { phone }),
      },
      select: { id: true, fullName: true, phone: true, email: true },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const schema = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(6),
    });
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors });

    const { currentPassword, newPassword } = result.data;
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: req.user.userId }, data: { password: hashed } });
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile, changePassword };