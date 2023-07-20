<<<<<<< HEAD:src/application/dtos/User.ts
import { UserDtoInterface } from '../../domain/interfaces/dtos/UserDtoInterface';
import { RoleDto } from './Role';
=======
import { UserDtoInterface } from '../../domain/interfaces/dtos/Userable';
import { RoleDto } from './RoleDto';
>>>>>>> 70df5610a0a7eb61d7232c7c5acaefce03f04557:src/application/dtos/UserDto.ts

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
