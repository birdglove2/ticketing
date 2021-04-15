import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  public statusCode = 401;
  public reason = 'Not authorized';

  constructor() {
    super('Not authorized');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
