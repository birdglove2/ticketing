import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  public statusCode = 400;

  constructor(public errorMessage: string) {
    super(errorMessage);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.errorMessage }];
  }
}
