/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../../src/app';

describe('users', () => {
  describe('create user', () => {
    it('should create a new user', async () => {
      expect.assertions(5);

      const response = await request(app).post('/users').send({
        email: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'Test Last Name',
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('uid');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body.first_name).toBe('Test');
      expect(response.body.last_name).toBe('Test Last Name');
    });
  });

  describe('update data user', () => {
    it('should update a user data', async () => {
      expect.assertions(4);

      const user = await request(app).post('/users').send({
        email: 'test2@example.com',
        password: 'test123',
        firstName: 'Test2',
        lastName: 'Test Last Name2',
      });

      const response = await request(app).put(`/users/${user.body.uid}`).send({
        email: 'test2@example.com',
        password: 'newpassword123',
        firstName: 'New Name',
        lastName: 'New Last Name',
      });

      expect(response.status).toBe(200);
      expect(response.request._data.email).toBe('test2@example.com');
      expect(response.request._data.firstName).toBe('New Name');
      expect(response.request._data.lastName).toBe('New Last Name');
    });
  });

  describe('show one user', () => {
    it('should find and show only one user', async () => {
      expect.assertions(4);

      const user = await request(app).post('/users').send({
        email: 'test3@example.com',
        password: 'test123',
        firstName: 'Test3',
        lastName: 'Test Last Name3',
      });

      const response = await request(app).get(`/users/${user.body.uid}`);

      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe('test3@example.com');
      expect(response.body.user.first_name).toBe('Test3');
      expect(response.body.user.last_name).toBe('Test Last Name3');
    });
  });

  describe('delete customer', () => {
    it('should delete all user data', async () => {
      expect.assertions(1);

      const user = await request(app).post('/users').send({
        email: 'test4@example.com',
        password: 'test123',
        firstName: 'Test4',
        lastName: 'Test Last Name4',
      });

      const response = await request(app).delete(`/users/${user.body.uid}`);

      expect(response.status).toBe(204);
    });
  });

  describe('show all customers', () => {
    it('should show the data of all customers', async () => {
      expect.assertions(1);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
    });
  });
});
