import ClientException from "./ClientException";

export default class NotAuthorizedException extends ClientException {
  constructor() {
    super(403, "You're not authorized");
  }
}