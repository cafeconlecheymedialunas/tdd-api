import request from 'supertest';
import { app } from '../src';
import ClientDatabase from "../src/infra/database/ClientDatabase"

const clientDatabase = new ClientDatabase().getClient()
let token: string = "";
describe('Crud Users', () => {


  it('User should has all users', async () => {
    try {

      await clientDatabase.sync({ force: true });
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ firstname: 'test name', lastname: "test last name", email: emailDefault, password: 'TestPassworde31@', roles: [1] });

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

  it('Should has a user', async () => {
    try {
      await clientDatabase.sync({ force: true });
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ firstname: 'test name', lastname: "test last name", email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseRegister.status).toBe(200);

      const responseLogin = await request(app)
        .post('/auth/login')
        .send({ email: emailDefault, password: 'TestPassworde31@' });

      expect(responseLogin.status).toBe(200);

      const responseUser = await request(app).get('/users/' + responseRegister.body.id).set('Authorization', `Bearer ${responseLogin.body.token}`);

      expect(responseUser.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('Should update a user', async () => {
    try {
      await clientDatabase.sync({ force: true });
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ firstname: 'test name', lastname: "test last name", email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseRegister.status).toBe(200);

      const responseLogin = await request(app)
        .post('/auth/login')
        .send({ email: emailDefault, password: 'TestPassworde31@' });

      expect(responseLogin.status).toBe(200);

      const responseUser = await request(app).put('/users/' + responseRegister.body.id).set('Authorization', `Bearer ${responseLogin.body.token}`).send({
        firstname: "New name",
        lastname: "New last name",
        email: "newemail@gmail.com",
        password: "Arselocuranew1234@",
        roles: [1]

      });

      expect(responseUser.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('Should delete a user', async () => {
    try {

      await clientDatabase.sync({ force: true });
      const emailDefault = Math.floor(Math.random() * 1000000) + '@gmail.com';

      const responseRegister = await request(app)
        .post('/auth/register')
        .send({ firstname: 'test name', lastname: "test last name", email: emailDefault, password: 'TestPassworde31@', roles: [1] });

      expect(responseRegister.status).toBe(200);

      const responseLogin = await request(app)
        .post('/auth/login')
        .send({ email: emailDefault, password: 'TestPassworde31@' });

      expect(responseLogin.status).toBe(200);

      const responseUser = await request(app).delete('/users/' + responseRegister.body.id).set('Authorization', `Bearer ${responseLogin.body.token}`);

      expect(responseUser.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });
});
