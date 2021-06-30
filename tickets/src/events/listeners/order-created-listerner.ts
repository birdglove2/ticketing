import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent, NotFoundError } from '@bkatickets/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id: orderId, ticket, version } = data;

    // Find the ticket
    const existingTicket = await Ticket.findById(ticket.id);

    // If no ticket throw an error
    if (!existingTicket) {
      throw new NotFoundError('Ticket not found!');
    }

    // Mark the ticket as reserved by setting an orderId property
    existingTicket.set('orderId', orderId);
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
