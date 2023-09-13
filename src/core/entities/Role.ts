/**
 * Represents a Role. The 'permissions' property should store an array of Permission IDs.
 */
export class Role {
  private _id: number;
  private _name: string;
  private _permissions: number[];

  constructor(id: number, name: string, permissions: number[]) {
    this._id = id;

    this._name = name;

    this._permissions = permissions;
  }

  public get id() {
    return this._id;
  }
  public get name() {
    return this._name;
  }

  public get permissions() {
    return this._permissions;
  }

  public set id(id: number) {
    this._id = id;
  }

  public set name(name: string) {
    this._name = name;
  }

  public set permissions(permissions: number[]) {
    this._permissions = permissions;
  }
}
