const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Transaction Endpoints', () => {
  let token;

  beforeAll(async () => {
    // Warm up Neon connection
    await prisma.$connect();

    // Register a new user and get token
    const email = `txn_${Date.now()}@example.com`;
    let res;

    // Retry up to 3 times in case of cold start
    for (let i = 0; i < 3; i++) {
      res = await request(app)
        .post('/api/auth/register')
        .send({ email, password: 'password123' });
      if (res.statusCode === 201) break;
      await new Promise(r => setTimeout(r, 2000)); // wait 2s and retry
    }

    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should add a transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'income', amount: 5000, category: 'Salary', description: 'Monthly salary' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all transactions', async () => {
    const res = await request(app)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get transaction summary', async () => {
    const res = await request(app)
      .get('/api/transactions/summary')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('balance');
  });

  it('should reject request without token', async () => {
    const res = await request(app)
      .get('/api/transactions');

    expect(res.statusCode).toBe(401);
  });
});