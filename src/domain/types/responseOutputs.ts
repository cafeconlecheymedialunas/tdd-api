import { Role as RoleDto } from '../../application/dtos/Role';
import { User as UserDto } from '../../application/dtos/User';
import { Permission as PermissionDto } from '../../application/dtos/Permission';
import { User as UserEntity } from '../entities/User';
import { Role as RoleEntity } from '../entities/Role';
import { Permission as PermissionEntity } from '../entities/Permission';

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

export interface ValidationError {
  key: string;
  error: string;
}

export type Dtos = UserDto | RoleDto | PermissionDto;

export type Entities = Array<UserEntity | RoleEntity | PermissionEntity>;
