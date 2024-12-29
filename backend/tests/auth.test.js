const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');

describe('Authentication Tests', () => {
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  };

  describe('User Registration', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should not register user with existing email', async () => {
      // First create a user
      await request(app)
        .post('/api/auth/register')
        .send(testUser);

      // Try to create the same user again
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.status).toBe(400);
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      await request(app)
        .post('/api/auth/register')
        .send(testUser);
    });

    it('should login existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });
      
      expect(res.status).toBe(401);
    });
  });
}); 