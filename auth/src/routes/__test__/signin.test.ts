import request from 'supertest';
import { app } from '../../app';

it('should return 201 on a successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
});

it('should return 400 if email does not exist or invalid', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: '', password: 'password' })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'asdf', password: 'password' })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('should return 400 if password does not match with the email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'unmatchedPassword' })
    .expect(400);
});

it('should return 400 if email, password, or both are missing', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app).post('/api/users/signin').send({ email: 'test@test.com' }).expect(400);

  await request(app).post('/api/users/signin').send({ password: 'password' }).expect(400);

  await request(app).post('/api/users/signin').send({}).expect(400);
});

it('should set a cookie after successful sigin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
