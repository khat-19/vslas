const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const mongoose = require('mongoose');

describe('Authentication Tests', () => {
  beforeAll(async () => {
    // Clear users collection before tests
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  };

  describe('User Registration', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(testUser.email);
    });

    it('should not register user with existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.status).toBe(400);
    });
  });

  describe('User Login', () => {
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