import { ValidationError } from './responseOutputs';

export class ClientException extends Error {
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

export class AuthenticationTokenMissingException extends ClientException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

export class NotAuthorizedException extends ClientException {
  constructor() {
    super(403, "You're not authorized");
  }
}

export class NotFoundException extends ClientException {
  constructor(id: string | number, entity: string) {
    super(404, `${entity} with ${typeof id == 'number' ? 'id' : 'propertie'} ${id} not found`);
  }
}

export class UserWithThatEmailAlreadyExistsException extends ClientException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export class WrongAuthenticationTokenException extends ClientException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}

export class WrongCredentialsException extends ClientException {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}

export class ValidationException extends ClientException {
  constructor(errors: ValidationError[]) {
    super(422, `There are ${errors.length} validation error${errors.length > 1 ? 's' : ''}`, errors);
  }
}
