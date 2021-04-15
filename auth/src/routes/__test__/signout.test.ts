import request from 'supertest';
import { app } from '../../app';

it('should clear the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res1 = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
  expect(res1.get('Set-Cookie')).toBeDefined();

  const res2 = await request(app).post('/api/users/signout').send({}).expect(200);
  expect(res2.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
