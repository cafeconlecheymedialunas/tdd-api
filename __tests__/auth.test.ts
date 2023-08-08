import request from 'supertest';
import { application as app } from '../src';
describe('Authentification API', () => {
  it('should register a user', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'Test User', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('should login a user', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ name: 'Test User', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseRegister.status).toBe(200);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: emailDefault, password: 'TestPassworde31@' });

      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('should validate login', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ name: 'test name', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseRegister.status).toBe(200);

      const response = await request(app).post('/auth/login').send({ email: emailDefault, password: 'sdsdfsdf' });

      expect(response.status).toBe(422);
    } catch (error) {
      console.log(error);
    }
  });

  it('should validate register', async () => {
    try {
      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ name: '', email: '', password: 'pass', roles: [1] });

      expect(responseRegister.status).toBe(422);
    } catch (error) {
      console.log(error);
    }
  });

  it('User should has permissions by route', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ name: 'test name', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseRegister.status).toBe(200);

      const responseLogin = await request(app)
        .post('/auth/login')
        .send({ email: emailDefault, password: 'TestPassworde31@' });

      expect(responseLogin.status).toBe(200);

      const responseUser = await request(app).get('/users').set('Authorization', `Bearer ${responseLogin.body.token}`);

      expect(responseUser.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('User should has not permissions by route', async () => {
    try {
      const responseUser = await request(app).get('/users').set('Authorization', `Bearer tokeninvalid`);

      expect(responseUser.status).toBe(403);
    } catch (error) {
      console.log(error);
    }
  });
});
