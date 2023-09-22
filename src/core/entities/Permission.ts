export class Permission {
  private id: number;
  private route: string;
  private method: string;

  constructor(id: number, route: string, method: string) {
    this.id = id;

    this.route = route;

    this.method = method;
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

