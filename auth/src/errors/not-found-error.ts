import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  public statusCode = 404;
  public reason;

  constructor(s: string) {
    super(s);
    this.reason = s;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
