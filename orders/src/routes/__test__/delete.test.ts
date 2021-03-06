import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('returns an 204 if the ticket is cancelled successfully', async () => {
  // Create a ticket with Ticket model
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  // Make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

  // Expectation to make sure the thing is cancelled

  const cancelledOrder = await Order.findById(order.id);
  expect(cancelledOrder!.id).toEqual(order.id);
  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  // Make a request to create an order
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to cancel the order
  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
