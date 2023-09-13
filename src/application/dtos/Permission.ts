/**
 * This class represents a Permission DTO (Data Transfer Object)
 * which is returned by all methods from the Role Repository.
 */
export class Permission {
  private _id: number;
  private _route: string;
  private _method: string;

  constructor(permission: { route: string; method: string; id: number }) {
    this._id = permission.id;

    this._route = permission.route;

    this._method = permission.method;
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
    this._method = method;
  }
}
