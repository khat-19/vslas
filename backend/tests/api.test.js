const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');

describe('API Endpoints', () => {
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  };

  describe('Authentication Endpoints', () => {
    describe('POST /api/auth/register', () => {
      it('should register a new user', async () => {
        const res = await request(app)
          .post('/api/auth/register')
          .send(testUser);
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
      }, 10000);

      it('should not register user with existing email', async () => {
        // First registration
        await request(app)
          .post('/api/auth/register')
          .send(testUser);
        
        // Try to register again with same email
        const res = await request(app)
          .post('/api/auth/register')
          .send(testUser);
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'User already exists');
      }, 10000);

      it('should not register user with invalid email', async () => {
        const res = await request(app)
          .post('/api/auth/register')
          .send({
            username: 'testuser',
            email: 'invalid-email',
            password: 'password123'
          });
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/not a valid email/i);
      }, 10000);
    });

    describe('POST /api/auth/login', () => {
      beforeEach(async () => {
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
      }, 10000);

      it('should not login with wrong password', async () => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'wrongpassword'
          });
        
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
      }, 10000);
    });
  });
}); 