export class Permission {
  private _id: number;
  private _route: string;
  private _method: string;

  constructor(id: number, route: string, method: string) {
    this._id = id;

    this._route = route;

    this._method = method;
  }

  public get id() {
    return this._id;
  }

  public get route() {
    return this._route;
  }

  public get method() {
    return this._method;
  }

  public set id(id: number) {
    this._id = id;
  }

  public set route(route: string) {
    this._route = route;
  }

  public set method(method: string) {
    this.method = method;
  }
}
