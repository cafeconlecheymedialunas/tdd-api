import { Email } from '../entities/auth/Email';
import ClientException from './ClientException';

export default class UserWithThatEmailAlreadyExistsException extends ClientException {
  constructor(email: Email) {
    super(400, `User with email ${email.getValue()} already exists`);
  }
}
