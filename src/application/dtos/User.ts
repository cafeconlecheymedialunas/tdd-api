import { Role as RoleDto } from './Role';

/**
 * This DTO represents the return of all methods from the User Repository. It includes the 'roles' property that will be transformed into a RoleDto[] array by the User Mapper.
 * @class User
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
