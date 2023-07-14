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

export type BasicExpression = {
  key: string;
  operation: 'greater_than' | 'less_than' | 'equal' | 'starts_with' | 'contains';
  value: string | number;
};
