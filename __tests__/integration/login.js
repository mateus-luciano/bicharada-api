/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../../src/app';

describe('login', () => {
  describe('enter login', () => {
    it('should enter in login', async () => {
      expect.assertions(2);

      const user = await request(app).post('/users').send({
        email: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'Test Last Name',
      });

      console.log(user.body)

      const response = await request(app).post('/login').send({
        // email: user.body.email,]
        email: 'test@example.com',
        password: 'test123',
        // password: user.body.password,
      });
      console.log(response)
      expect(response.status).toBe(200);
      expect(response.body.email).toBe('test@example.com');
    });
  });
});
