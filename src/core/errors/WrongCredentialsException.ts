import ClientException from "./ClientException";


export default class WrongCredentialsException extends ClientException {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}