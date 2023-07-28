import { QueryFilter } from '../../types/responseOutputs';
import { Permission as PermissionDto } from '../../../application/dtos/Permission';

export interface PermissionMockable {
  getById(id: number): PermissionDto | false;
  getByIdList(role: number[]): PermissionDto[] | false;
  filter(conditions: QueryFilter[]): PermissionDto[];
}
