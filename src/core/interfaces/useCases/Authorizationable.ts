import { Permission as PermissionDto } from '../../../application/dtos/Permission';
export interface Authorizationable {
  getRoutePermission(route: string, method: string): PermissionDto;
  getUserPermissions(token: string): Promise<PermissionDto[]>;
  authorize(route: string, method: string, token: string): Promise<boolean>;
}
