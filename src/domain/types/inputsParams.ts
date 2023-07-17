export interface PermissionInput {
  route: string;
  method: string;
}

export interface RoleInput {
  name: string;
  permissions: number[];
}

export interface UserInput {
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
  operation: 'greater_than' | 'less_than' | 'equal' | 'starts_with' | 'contains';
  value: string | number;
};
export type FilterCondition = {
  key: string;
  condition: Condition;
  value: string;
};
