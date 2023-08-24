import request from 'supertest';
import { app } from "../src/index";
describe('Crud Users', () => {
  it('User should has all users', async () => {
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
});
