import request from 'supertest';
import { app } from '../../app';

it('should return 201 on a successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('should return 400 if email is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: '', password: 'password' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'asdf', password: 'password' })
    .expect(400);
});

it('should return 400 if password is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'p' })
    .expect(400);
});

it('should return 400 if email, password, or both are missing', async () => {
  await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400);

  await request(app).post('/api/users/signup').send({ password: 'password' }).expect(400);

  await request(app).post('/api/users/signup').send({}).expect(400);
});

it('should disallow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});
