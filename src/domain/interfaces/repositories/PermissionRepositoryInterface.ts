import { PermissionDto } from '../../../application/dtos/PermissionDto';
import { QueryFilter } from '../../types/requestParams';

export interface PermissionRepositoryInterface {
  getById(id: number): Promise<PermissionDto | false>;

  getByIdList(role: number[]): Promise<PermissionDto[] | false>;
  filter(conditions: QueryFilter[]): Promise<PermissionDto[]>;
}
