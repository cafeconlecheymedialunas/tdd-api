import { QueryFilter } from '../../types/response';
import { Permission as PermissionDto } from '../../../application/dtos/Permission';

export interface PermissionMockable {
  getById(id: number): Promise<PermissionDto | false>;
  getByIdList(role: number[]): Promise<PermissionDto[] | false>;
  filter(conditions: QueryFilter[]): Promise<PermissionDto[]>;
}
