import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent, OrderStatus } from '@bkatickets/common';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create and save a ticket
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = await Ticket.build({
    title: 'Concert',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  ticket.set({ orderId });
  await ticket.save();

  // create a fake  data event
  const data: OrderCancelledEvent['data'] = {
    id: ticket.orderId!,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, orderId, ticket, data, msg };
};

it('removes the orderId of the ticket, acks the msg and publish the event', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();

  expect(msg.ack).toHaveBeenCalled();

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
