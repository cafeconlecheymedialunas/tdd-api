import { Method } from "core/entities/auth/Method";

/**
 * This class represents a Permission DTO (Data Transfer Object)
 * which is returned by all methods from the Role Repository.
 */
export class Permission {
  private id: number;
  private route: string;
  private method: Method;

  constructor(permission: { route: string; method: Method; id: number }) {
    this.id = permission.id;

    this.route = permission.route;

    this.method = permission.method;
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
    this.route = route;
  }

  public setMethod(method: Method) {
    this.method = method;
  }
}
