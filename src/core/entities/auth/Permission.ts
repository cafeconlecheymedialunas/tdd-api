import { hasCorrectMinLength, isNotEmpty } from './validaciones';

export class Permission {
  private id?: number;
  private route: string;
  private method: string;

  constructor(user: { id?: number; route: string; method: string }) {
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

  public setId(id: number) {
    this.id = id;
  }

  public setRoute(route: string) {
    if (isNotEmpty(route)) {
    }
    this.route = route;
  }

  public setMethod(method: string) {
    if (isNotEmpty(method)) {
    }

    this.method = method;
  }
}
