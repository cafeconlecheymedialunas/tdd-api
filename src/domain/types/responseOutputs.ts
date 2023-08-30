import { Role as RoleDto } from '#src/application/dtos/Role';
import { User as UserDto } from '#src/application/dtos/User';
import { Permission as PermissionDto } from '#src/application/dtos/Permission';
import { User as UserEntity } from '#src/domain/entities/User';
import { Role as RoleEntity } from '#src/domain/entities/Role';
import { Permission as PermissionEntity } from '#src/domain/entities/Permission';

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
