import { ValidationError } from 'core/types/validationRules';

export default class ClientException extends Error {
  public status: number;
  public message: string;
  public errors: ValidationError[];

  constructor(status = 500, message = 'Server Error', errors: ValidationError[] = []) {
    super(message);

    this.status = status;

    this.message = message;
    this.errors = errors;
  }
}
