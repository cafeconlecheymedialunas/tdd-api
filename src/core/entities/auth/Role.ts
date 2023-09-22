/**
 * Represents a Role. The 'permissions' property should store an array of Permission IDs.
 */
export class Role {
  private id: number;
  private name: string;
  private permissions: number[];

  constructor(id: number, name: string, permissions: number[]) {
    this.id = id;

    this.name = name;

    this.permissions = permissions;
  }

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }

  public getPermissions() {
    return this.permissions;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setPermissions(permissions: number[]) {
    this.permissions = permissions;
  }
}
