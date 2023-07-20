import { RoleDto } from '../../../application/dtos/Role';

export interface UserDtoInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: RoleDto[];
}
