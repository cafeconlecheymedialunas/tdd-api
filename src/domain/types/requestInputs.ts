import { Role as RoleDto } from '../../application/dtos/Role';
import { User as UserDto } from '../../application/dtos/User';
import { Permission as PermissionDto } from '../../application/dtos/Permission';

export interface PermissionRequestParams {
  route: string;
  method: string;
}

export interface RoleRequestParams {
  name: string;
  permissions: number[];
}

export interface UserRequestParams {
  name: string;
  email: string;
  password: string;
  roles: number[];
}
export type Dtos = UserDto | RoleDto | PermissionDto;
