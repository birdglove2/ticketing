import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  public errors: ValidationError[];
  public statusCode = 400;

  constructor(errors: ValidationError[]) {
    super('Invalid request parameters');
    this.errors = errors;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
