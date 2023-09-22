import ClientException from "./ClientException";

export default class AuthenticationTokenMissingException extends ClientException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}