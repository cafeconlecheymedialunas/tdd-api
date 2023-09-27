export type PermissionRequestParams = {
  route: string;
  method: string;
};

export type RoleRequestParams = {
  name: string;
  permissions: number[];
};

export type UserRequestParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: number[];
};



