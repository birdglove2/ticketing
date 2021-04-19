import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('should return a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send({}).expect(404);
});

it('should return the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;

  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app).get(`/api/tickets/${res.body.id}`).send().expect(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(`${price}`);
});
