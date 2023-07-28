import { Permission } from '../../domain/entities/Permission';
/**
 * This DTO is the return of all methods from the Role Repository. It includes the 'permissions' property that will be transformed by Role Mapper in a Permission[] array.
 * @class Role
 */
export class Role {
  id: number;
  name: string;
  permissions: Permission[];

  constructor(name: string, id: number, permissions: Permission[]) {
    this.name = name;

    this.id = id;

    this.permissions = permissions;
  }
}
