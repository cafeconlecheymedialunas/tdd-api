import { Permission } from '../../entities/Permission';

export interface RoleDtoInterface {
  id: number;
  name: string;
  permissions: Permission[];
}
