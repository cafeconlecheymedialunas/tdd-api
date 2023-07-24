import { Role as RoleDto } from '../../../application/dtos/Role';

export interface RoleMockable {
  getById(id: number): Promise<RoleDto | false>;
  getByIdList(role: number[]): Promise<RoleDto[] | false>;
}
