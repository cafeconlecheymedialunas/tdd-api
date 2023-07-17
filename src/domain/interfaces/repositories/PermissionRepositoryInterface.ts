import { PermissionDto } from '../../../application/dtos/PermissionDto';
import { FilterCondition } from '../../types/inputsParams';

export interface PermissionRepositoryInterface {
  getById(id: number): Promise<PermissionDto | false>;
  getByRouteMethod(route: string, method: string): Promise<PermissionDto | false>;
  getByIdList(role: number[]): Promise<PermissionDto[] | false>;
  filter(conditions: FilterCondition[]): Promise<PermissionDto[]>;
}
