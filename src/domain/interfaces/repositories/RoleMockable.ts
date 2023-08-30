import { Role as RoleDto } from '#src/application/dtos/Role';

export interface RoleMockable {
  getById(id: number): RoleDto;
  getByIdList(role: number[]): RoleDto[];
}
