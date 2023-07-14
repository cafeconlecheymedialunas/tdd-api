import { Role } from '../../domain/entities/Role.entity';
import { UserDtoInterface } from '../../domain/interfaces/dtos/UserDtoInterface';
import { RoleDto } from './RoleDto';

export class UserDto implements UserDtoInterface {
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
