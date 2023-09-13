import request from 'supertest';
import { app } from '../src';

describe('Authentification API', () => {
  it('should register a user', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const response = await request(app)
        .post('/auth/register')
        .send({ name: 'Test User', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(response.status).toBe(200);
      expect(response.body.user.id).toBeDefined();
      expect(typeof response.body.user.id).toBe('number');
      expect(response.body.user.name).toBe('Test User');
      expect(response.body.user.email).toBe(emailDefault);
    } catch (error) {
      console.log(error);
    }
  });

  it('User already exist', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      await request(app)
        .post('/auth/register')
        .send({ name: 'Test User', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      const responseAlreadyExist = await request(app)
        .post('/auth/register')
        .send({ name: 'Test User', email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseAlreadyExist.status).toBe(400);
      expect(responseAlreadyExist.body.user.id).toBeDefined();
      expect(typeof responseAlreadyExist.body.user.id).toBe('number');
      expect(responseAlreadyExist.body.user.name).toBe('Test User');
      expect(responseAlreadyExist.body.user.email).toBe(emailDefault);
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

    
      expect(response.body.user.id).toBeDefined();
      expect(response.body.error).toBe(false);
      console.log(response.body)
      expect(typeof response.body.data.token).toBe("number");

      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('should login a user', async () => {
    try {
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const response = await request(app)
        .post('/auth/login')
        .send({ email: emailDefault, password: 'TestPassworde31@' });

      expect(response.status).toBe(401);
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
});
