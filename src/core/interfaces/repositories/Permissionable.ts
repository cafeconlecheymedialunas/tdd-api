import { QueryFilter } from '../../types/requestInputs';
import { Permission as PermissionDto } from '../../dtos/Permission';
import { Permission as PermissionEntity } from '../../entities/Permission';
export interface Permissionable {
  getById(id: number): PermissionDto;
  getByIdList(role: number[]): PermissionDto[];
  filter(conditions: QueryFilter[]): PermissionDto[];
  toDto(permission: PermissionEntity): PermissionDto;
  dtoList(permissions: PermissionEntity[]): PermissionDto[];
}
