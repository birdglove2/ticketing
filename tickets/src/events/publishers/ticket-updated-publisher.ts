import { Publisher, Subjects, TicketUpdatedEvent } from '@bkatickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
