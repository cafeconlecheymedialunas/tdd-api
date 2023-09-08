import { QueryFilter } from '../../types/requestInputs';
import { Permission as PermissionDto } from '../../../application/dtos/Permission';

export interface Permissionable {
  getById(id: number): PermissionDto;
  getByIdList(role: number[]): PermissionDto[];
  filter(conditions: QueryFilter[]): PermissionDto[];
}
