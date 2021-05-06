import request from 'supertest';
import app from '../../src/app';

describe('users', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      expect.assertions(1);

      const region = await request(app).post('/regions').send({
        name: 'Vale do Paranhana',
      });

      const response = await request(app).post('/users').send({
        email: 'mateus@example.com',
        password: '12345678',
        name: 'Mateus',
        city: 'Parobé',
        phone: '(51) 9 9999-9999',
        region: region.body.uid,
      });

      expect(response.status).toBe(201);
    });

    it('should not create a new user without all parameters', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        email: 'mateus@example.com',
        password: '12345678',
        name: 'Mateus',
      });

      expect(response.status).toBe(400);
    });

    it('should not create a new user with invalid parameters', async () => {
      expect.assertions(1);

      const response = await request(app).post('/users').send({
        email: 'mateus@example.com',
        password: 12345678,
        name: 'Mateus',
        city: true,
        phone: '(51) 9 9999-9999',
      });

      expect(response.status).toBe(400);
    });
  });
});
