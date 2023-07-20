import { QueryFilter } from '../../types/requestParams';
import { PermissionDto } from '../../../application/dtos/Permission';

export interface PermissionRepositoryInterface {
  getById(id: number): Promise<PermissionDto | false>;
  getByIdList(role: number[]): Promise<PermissionDto[] | false>;
  filter(conditions: QueryFilter[]): Promise<PermissionDto[]>;
}
