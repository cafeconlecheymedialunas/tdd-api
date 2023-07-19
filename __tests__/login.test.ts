import request from 'supertest';
import { app } from '../src';
describe('Auth API', () => {
  it('should register a user', async () => {
    let email_default = Math.floor(Math.random() * 1000000) + '@gmail.com';
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: email_default, password: 'testpass', roles: [1] });
    expect(response.status).toBe(200);

  });

  it('should login a user', async () => {
    let email_default = Math.floor(Math.random() * 1000000) + '@gmail.com';
    const responseRegister = await request(app).post('/auth/register').send({ name: 'Test User', email: email_default, password: 'testpass', roles: [1] });
    const response = await request(app).post('/auth/login').send({ email: email_default, password: 'testpass' });
    expect(response.status).toBe(200);

  });

});
