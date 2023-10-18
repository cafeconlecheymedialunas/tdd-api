import { MESSAGES } from '../../../core/types/validationRules';
import { ValidationException } from '../../errors';
import { Method } from './Method';
import { hasCorrectMaxLength, isNotEmpty, isString } from './validaciones';
import { SerialId } from './SerialId';
import { Name } from './Name';

export class Permission {
  private id?: number;
  private route!: string;
  private method!: string;

  constructor(user: { id?: number; route: string; method: string }) {
    if (user.id) {
      this.setId(user.id);
    }
    this.setRoute(user.route);
    this.setMethod(user.method);
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

  public setId(value: number) {
    const serialId = new SerialId(value);
    this.id = serialId.getValue();
  }

  public setRoute(value: string) {
    const route = new Name(value)
    this.route = route.getValue();
  }

  public setMethod(value: string) {
    const method = new Method(value)
    this.method = method.getValue();
  }
}
