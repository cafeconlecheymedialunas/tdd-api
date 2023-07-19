import { Permission } from '../entities/Permission';

export interface Payload {
  id: number;
  permissions: Permission[];
}

export interface HttpResponse {
  status: number;
  message: string;
  data?: unknown[];
}
export interface ValidationError {
  key: string;
  error: string;
}
