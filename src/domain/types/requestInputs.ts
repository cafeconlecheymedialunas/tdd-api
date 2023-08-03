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

export enum Condition {
  Equal = 'equal',
  NotEqual = 'not_equal',
  GreaterThan = 'greater_than',
  LessThan = 'less_than',
}

export type QueryFilter = {
  key: string;
  condition: Condition;
  value: string;
};
