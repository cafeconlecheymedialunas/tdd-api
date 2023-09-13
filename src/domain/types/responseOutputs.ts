import { Role as RoleDto } from '../../application/dtos/Role';
import { User as UserDto } from '../../application/dtos/User';
import { Permission as PermissionDto } from '../../application/dtos/Permission';
import { User as UserEntity } from '../../domain/entities/User';
import { Role as RoleEntity } from '../../domain/entities/Role';
import { Permission as PermissionEntity } from '../../domain/entities/Permission';

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
