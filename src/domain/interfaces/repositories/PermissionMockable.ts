import { QueryFilter } from '#src/domain/types/requestInputs';
import { Permission as PermissionDto } from '#src/application/dtos/Permission';

export interface PermissionMockable {
  getById(id: number): PermissionDto;
  getByIdList(role: number[]): PermissionDto[];
  filter(conditions: QueryFilter[]): PermissionDto[];
}
