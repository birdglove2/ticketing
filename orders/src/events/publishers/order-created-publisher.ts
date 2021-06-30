import { Publisher, OrderCreatedEvent, Subjects } from '@bkatickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
