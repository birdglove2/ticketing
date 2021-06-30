import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@bkatickets/common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, version, userId, status, ticket } = data;

    const order = Order.build({
      id,
      version,
      userId,
      status,
      price: ticket.price,
    });
    await order.save();

    msg.ack();
  }
}
