
import { Permission as PermissionEntity } from '../entities/auth/Permission';
import { Role as RoleEntity } from '../entities/auth/Role';

export type PermissionRequestParams = {
  route: string;
  method: string;
};

export type RoleRequestParams = {
  name: string;
  permissions: PermissionEntity[];
};

export type UserRequestParams = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: RoleEntity[];
};

export type ClientRequestParams = {
  name: string;
  roles: RoleEntity[];
};
