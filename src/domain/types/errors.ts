import { ValidationError } from './response';

export class ClientError extends Error {
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

export class AuthenticationTokenMissingException extends ClientError {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

export class NotAuthorizedException extends ClientError {
  constructor() {
    super(403, "You're not authorized");
  }
}

export class PostNotFoundException extends ClientError {
  constructor(id: number) {
    super(404, `Post with id ${id} not found`);
  }
}

export class PermissionNotFoundException extends ClientError {
  constructor() {
    super(404, `Permission not found`);
  }
}
export class UserNotFoundException extends ClientError {
  constructor(id: number) {
    super(404, `User with id ${id} not found`);
  }
}

export class UserWithThatEmailAlreadyExistsException extends ClientError {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export class WrongAuthenticationTokenException extends ClientError {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}

export class WrongCredentialsException extends ClientError {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}

export class ValidationException extends ClientError {
  public errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super(422, `${errors[0].error}. (and ${errors.length} more errors)`);
    this.errors = errors;
  }
}
