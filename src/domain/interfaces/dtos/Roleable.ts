import { Permission } from '../../entities/Permission';

export interface Roleable {
  id: number;
  name: string;
  permissions: Permission[];
}
