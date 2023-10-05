import { MESSAGES } from 'core/types/validationRules';
import { ValidationException } from '../../errors';
import { Method } from './Method';
import { hasCorrectMaxLength, isNotEmpty, isString } from './validaciones';
import { SerialId } from './SerialId';
import { Name } from './Name';

export class Permission {
  private id?: SerialId;
  private route: Name;
  private method: Method;

  constructor(user: { id?: SerialId; route: Name; method: Method }) {
    this.id = user.id;

    this.route = user.route;

    this.method = user.method;
  }

  public getId() {
    return this.id;
  }

  public getRoute() {
    return this.route;
  }

  public getMethod() {
    return this.method;
  }

  public setId(id: SerialId) {
    this.id = id;
  }

  public setRoute(route: Name) {
    this.route = route;
  }

  public setMethod(method: Method) {
    this.method = method;
  }
}
