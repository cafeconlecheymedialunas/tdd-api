import { RoleDto } from '../../../application/dtos/Role';

export interface RoleRepositoryInterface {
  getById(id: number): Promise<RoleDto | false>;
  getByIdList(role: number[]): Promise<RoleDto[] | false>;
}
