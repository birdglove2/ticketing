import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent, NotFoundError } from '@bkatickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price, version } = data;

    const ticket = await Ticket.findByEvent({ id, version });
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    ticket.set({ title, price, version });
    await ticket.save();

    msg.ack();
  }
}
