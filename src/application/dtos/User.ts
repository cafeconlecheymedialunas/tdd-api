import { Role as RoleDto } from './Role';
/**
 * This DTO is the return of all methods from the User Repository. It includes the 'roles' property that will be transformed by User Mapper in a Role[] array.
 * @class Role
 */
export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: RoleDto[];

  constructor(id: number, name: string, email: string, password: string, roles: RoleDto[]) {
    this.name = name;

    this.email = email;

    this.id = id;

    this.password = password;

    this.roles = roles;
  }
}
