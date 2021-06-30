import { Publisher, OrderCancelledEvent, Subjects } from '@bkatickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
