import { Permission as PermissionDto } from './Permission';
/**
 * This DTO is the return of all methods from the Role Repository. It includes the 'permissions' property that will be transformed by Role Mapper in a Permission[] array.
 * @class Role
 */
export class Role {
  id: number;
  name: string;
  permissions: PermissionDto[];

  constructor(name: string, id: number, permissions: PermissionDto[]) {
    this.name = name;

    this.id = id;

    this.permissions = permissions;
  }
}
