import { Role as RoleDto } from '#root/application/dtos/Role';
import { User as UserDto } from '#root/application/dtos/User';
import { Permission as PermissionDto } from '#root/application/dtos/Permission';
import { User as UserEntity } from '#root/domain/entities/User';
import { Role as RoleEntity } from '#root/domain/entities/Role';
import { Permission as PermissionEntity } from '#root/domain/entities/Permission';

export type Payload = {
  id: number;
  permissions: PermissionEntity[];
};

export type DecodedToken = {
  exp: string;
  expiresIn: Date;
  id: number;
  permissions: PermissionEntity[];
};

export type Dtos = UserDto | RoleDto | PermissionDto;

export type Entities = Array<UserEntity | RoleEntity | PermissionEntity>;
