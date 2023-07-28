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
