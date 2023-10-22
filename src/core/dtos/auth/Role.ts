import { Permission as PermissionDto } from './Permission';
/**
 * This DTO is returned by all methods from the Role Repository. It includes the 'permissions' property that will be transformed into a PermissionDto[] array by the Role Mapper.
 * @class Role
 */
export class Role {
  private id: number;
  private name: string;
  private permissions: PermissionDto[];

  constructor(role: { name: string; id: number; permissions: PermissionDto[] }) {
    this.name = role.name;

    this.id = role.id;

    this.permissions = role.permissions;
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

  public setPermissions(permissions: PermissionDto[]) {
    this.permissions = permissions;
  }
}
