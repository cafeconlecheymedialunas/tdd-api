import { Userable } from '../../domain/interfaces/dtos/Userable';
import { Role as RoleDto } from './Role';

export class UserDto implements Userable {
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
