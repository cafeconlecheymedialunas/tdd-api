import { Permission } from '../entities/Permission';

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

export interface Payload {
  id: number;
  permissions: Permission[];
}

export interface ValidationError {
  key: string;
  error: string;
}
