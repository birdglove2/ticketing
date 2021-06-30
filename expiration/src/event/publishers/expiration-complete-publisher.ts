import { Publisher, ExpirationCompletedEvent, Subjects } from '@bkatickets/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationCompleted;
}
