import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  NotFoundError,
  OrderStatus,
} from '@bkatickets/common';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    // actually should update the order version that status was changed
    // but now it's ok since when the payment was completed, the order will not be used anymore.

    msg.ack();
  }
}
