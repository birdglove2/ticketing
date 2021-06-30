import { Publisher, PaymentCreatedEvent, Subjects } from '@bkatickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
