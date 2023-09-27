import { Role as RoleDto } from '../dtos/auth/Role';
import { User as UserDto } from '../dtos/auth/User';
import { Permission as PermissionDto } from '../dtos/auth/Permission';
import { User as UserEntity } from '../entities/auth/User';
import { Role as RoleEntity } from '../entities/auth/Role';
import { Permission as PermissionEntity } from '../entities/auth/Permission';

export type Payload = {
  id: number;
  permissions: PermissionDto[];
};

export type DecodedToken = {
  exp: string;
  expiresIn: Date;
  id: number;
  permissions: PermissionDto[];
};

export type Dtos = UserDto | RoleDto | PermissionDto;

export type Entities = Array<UserEntity | RoleEntity | PermissionEntity>;
