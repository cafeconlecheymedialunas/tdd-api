import ClientException from "./ClientException";


export default class WrongAuthenticationTokenException extends ClientException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}