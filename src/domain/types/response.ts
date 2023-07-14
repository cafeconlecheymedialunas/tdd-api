import { Permission } from '../entities/Permission.entity';
export interface Payload {
  id: number;
  permissions: Permission[];
}
export interface HttpResponse {
  status: number;
  message: string;
  data?: unknown[];
}

class ClientError extends Error {
  public status: number;
  public message: string;
  public errors: Error[];
  constructor(status: number, message: string, errors: Error[] = []) {
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
  constructor(id: string) {
    super(404, `Post with id ${id} not found`);
  }
}

export class UserNotFoundException extends ClientError {
  constructor(id: string) {
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
  constructor(errors: Error[]) {
    super(422, `The team name must be a string. (and 4 more errors)`);
    this.errors = errors;
  }
}

export interface Error {
  key: string;
  errors: string[];
}


