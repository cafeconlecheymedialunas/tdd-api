import { Role as RoleDto } from '../../../application/dtos/Role';

export interface Roleable {
  getById(id: number): RoleDto;
  getByIdList(role: number[]): RoleDto[];
}
