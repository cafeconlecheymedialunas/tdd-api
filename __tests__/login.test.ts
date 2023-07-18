import request from 'supertest';
import { app } from '../src';
describe('Auth API', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test User', email: 'testt@test.com', password: 'testpass', roles: [1] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: false,
        data: {
          id: expect.any(Number),
          name: 'Test User',
          email: 'testt@test.com',
          password: expect.any(String),
          roles: [
            {
              id: 1,
              name: 'Admin',
              permissions: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  method: expect.any(String),
                  route: expect.any(String),
                }),
              ]),
            },
          ],
        },
      }),
    );
  });
  it('should login a user', async () => {
    const response = await request(app).post('/auth/login').send({ email: 'testt@test.com', password: 'testpass' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: false,
        data: {
          token: expect.any(String),
        },
      }),
    );
  });
});
