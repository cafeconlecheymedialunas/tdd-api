import { QueryFilter } from '../../../types/database';
import { Permission as PermissionDto } from '../../../dtos/auth/Permission';
import { Permission as PermissionEntity } from '../../../entities/auth/Permission';

import { PermissionRequestParams } from '../../../types/requestInputs';
export interface Permissionable {
  getAll(): Promise<PermissionEntity[]>;
  filter(conditions: QueryFilter): Promise<PermissionEntity[]>;
  create(permission: PermissionRequestParams): Promise<PermissionEntity>;
  delete(id: number): Promise<number>;
  update(id: number, permission: PermissionRequestParams): Promise<PermissionEntity>;
  getById(id: number): Promise<PermissionEntity>;
  toEntity(permission: PermissionRequestParams): PermissionEntity;
}
