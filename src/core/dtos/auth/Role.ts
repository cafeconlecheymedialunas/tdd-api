import { Permission as PermissionDto } from './Permission';
/**
 * This DTO is returned by all methods from the Role Repository. It includes the 'permissions' property that will be transformed into a PermissionDto[] array by the Role Mapper.
 * @class Role
 */
export class Role {
  private _id: number;
  private _name: string;
  private _permissions: PermissionDto[];

  constructor(role: { name: string; id: number; permissions: PermissionDto[] }) {
    this._name = role.name;

    this._id = role.id;

    this._permissions = role.permissions;
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

  public set permissions(permissions: PermissionDto[]) {
    this._permissions = permissions;
  }
}
