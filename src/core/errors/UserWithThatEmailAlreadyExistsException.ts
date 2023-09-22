import ClientException from "./ClientException";

export default class UserWithThatEmailAlreadyExistsException extends ClientException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}