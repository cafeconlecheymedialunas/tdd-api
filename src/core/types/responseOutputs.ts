import { Role as RoleDto } from '../dtos/Role';
import { User as UserDto } from '../dtos/User';
import { Permission as PermissionDto } from '../dtos/Permission';
import { User as UserEntity } from '../entities/User';
import { Role as RoleEntity } from '../entities/Role';
import { Permission as PermissionEntity } from '../entities/Permission';

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
