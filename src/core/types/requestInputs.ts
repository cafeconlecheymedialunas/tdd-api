import { Email } from '../entities/auth/Email';
import { Permission as PermissionEntity } from '../entities/auth/Permission';
import { Role as RoleEntity } from '../entities/auth/Role';
import { Password } from '../entities/auth/Password';

export type PermissionRequestParams = {
  route: string;
  method: string;
};

export type RoleRequestParams = {
  name: string;
  permissions: PermissionEntity[];
};

export type UserRequestParams = {
  firstName: string;
  lastName: string;
  email: Email;
  password: Password;
  roles: RoleEntity[];
};
