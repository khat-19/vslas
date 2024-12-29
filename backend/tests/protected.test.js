const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('Protected Routes', () => {
  let token;
  let user;

  beforeEach(async () => {
    // Create test user
    user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    // Generate token
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  describe('GET /api/users/profile', () => {
    it('should get user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(user.email);
    });

    it('should not allow access without token', async () => {
      const res = await request(app)
        .get('/api/users/profile');

      expect(res.status).toBe(401);
    });
  });
}); 