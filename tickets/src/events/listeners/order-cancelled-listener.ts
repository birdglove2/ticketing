import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCancelledEvent, NotFoundError } from '@bkatickets/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const { id: orderId, ticket, version } = data;

    // Find the ticket
    const existingTicket = await Ticket.findById(ticket.id);

    // If no ticket throw an error
    if (!existingTicket) {
      throw new NotFoundError('Ticket not found!');
    }

    // Mark the ticket as not reserved by removing an orderId property
    existingTicket.set({ orderId: undefined });
    await existingTicket.save();

    // publish the event
    await new TicketUpdatedPublisher(this.client).publish({
      id: existingTicket.id,
      price: existingTicket.price,
      title: existingTicket.title,
      userId: existingTicket.userId,
      orderId: existingTicket.orderId,
      version: existingTicket.version,
    });

    // Ack the message
    msg.ack();
  }
}
