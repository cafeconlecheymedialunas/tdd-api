import { QueryFilter } from 'domain/types/requestInputs';
import { Permission as PermissionDto } from 'application/dtos/Permission';

export interface PermissionMockable {
  getById(id: number): PermissionDto;
  getByIdList(role: number[]): PermissionDto[];
  filter(conditions: QueryFilter[]): PermissionDto[];
}
