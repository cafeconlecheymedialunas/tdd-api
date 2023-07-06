import request from 'supertest';
import { app } from '../src';

describe('Auth API', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'testuser@test.com', password: 'testpass',name:'Test User',role : ['admin'] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should log in a user', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'testuser@test.com', password: 'testpass' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User logged in successfully');
  });
});
