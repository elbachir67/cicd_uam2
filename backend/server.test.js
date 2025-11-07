const request = require('supertest');
const app = require('./server');

describe('API Tests', () => {
  test('GET /api/health should return OK', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET /api/transactions should return array', async () => {
    const response = await request(app).get('/api/transactions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
