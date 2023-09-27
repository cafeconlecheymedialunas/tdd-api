/**
 * This class represents a Permission DTO (Data Transfer Object)
 * which is returned by all methods from the Role Repository.
 */
export class Permission {
  private id: number;
  private route: string;
  private method: string;

  constructor(permission: { route: string; method: string; id: number }) {
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

  public setMethod(method: string) {
    this.method = method;
  }
}
