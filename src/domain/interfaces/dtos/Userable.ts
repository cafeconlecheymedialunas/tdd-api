import { Role as RoleDto } from '../../../application/dtos/Role';

export interface Userable {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: RoleDto[];
}
