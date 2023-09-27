import { QueryFilter } from 'core/types/database';
import { Permission as PermissionDto } from 'core/dtos/auth/Permission';
import { Permission as PermissionEntity } from 'core/entities/auth/Permission';
import { Permission as PermissionModel } from 'infra/database/models/Permission';

import { PermissionRequestParams } from 'core/types/requestInputs';
export interface Permissionable {
  getAll(): Promise<PermissionDto[]>;
  filter(conditions: QueryFilter): Promise<PermissionDto[]>;
  create(permission: PermissionRequestParams): Promise<PermissionDto>;
  delete(id: number): Promise<number>;
  update(id: number, permission: PermissionRequestParams): Promise<PermissionDto>;
  getById(id: number): Promise<PermissionDto>;
  toDto(permission: PermissionEntity | PermissionModel): PermissionDto;
 
}
