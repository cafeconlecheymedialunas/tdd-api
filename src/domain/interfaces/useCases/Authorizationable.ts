import { Permission as PermissionEntity } from '#root/domain/entities/Permission';
import { Permission as PermissionDto } from '#root/application/dtos/Permission';
export interface Authorizationable {
  getRoutePermission(route: string, method: string): PermissionDto;
  getUserPermissions(token: string): Promise<PermissionEntity[]>;
  authorize(route: string, method: string, token: string): Promise<boolean>;
}
