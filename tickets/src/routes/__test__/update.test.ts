import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';

it('should return a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({ title: 'adad', price: 20 })
    .expect(404);
});

it('should return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).put(`/api/tickets/${id}`).send({ title: 'adad', price: 20 }).expect(401);
});

it('should return a 401 if the user does not own the ticket', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'adad', price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signin())
    .send({ title: 'dflskgj;sgsdgk', price: 1000 })
    .expect(401);
});

it('should return a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'adad', price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 1000 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'asdasd', price: -10 })
    .expect(400);
});

it('should update the ticket that is provided valid inputs', async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'adad', price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new Title', price: 10000 })
    .expect(200);

  const ticketResponse = await request(app).get(`/api/tickets/${res.body.id}`).send().expect(200);

  expect(ticketResponse.body.title).toEqual('new Title');
  expect(ticketResponse.body.price).toEqual('10000');
});

it('rejects update if the ticket is reserved', async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  const cookie = global.signin();
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'adad', price: 20 });

  const ticket = await Ticket.findById(res.body.id);
  ticket!.set({ orderId });
  await ticket!.save();

  const { body } = await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new Title', price: 10000 })
    .expect(400);

  expect(body.errors[0].message).toEqual('Cannot edit a reserved ticket');
});

it('publishes an event', async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'adad', price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new Title', price: 10000 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
