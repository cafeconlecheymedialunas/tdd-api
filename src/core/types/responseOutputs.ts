import { Role as RoleDto } from '../dtos/auth/Role';
import { User as UserDto } from '../dtos/auth/User';
import { Permission as PermissionDto } from '../dtos/auth/Permission';
import { User as UserEntity } from '../entities/auth/User';
import { Role as RoleEntity } from '../entities/auth/Role';
import { Permission as PermissionEntity } from '../entities/auth/Permission';
import { Email } from '../entities/auth/Email';

export type Payload = {
  email: Email;
  permissions: PermissionEntity[];
};

export type DecodedToken = {
  exp: string;
  expiresIn: Date;
  email: Email;
  permissions: PermissionEntity[];
};

export type Dtos = UserDto | RoleDto | PermissionDto;

export type Entities = Array<UserEntity | RoleEntity | PermissionEntity>;
