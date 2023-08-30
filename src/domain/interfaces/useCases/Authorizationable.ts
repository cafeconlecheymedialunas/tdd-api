import { Permission as PermissionEntity } from '#src/domain/entities/Permission';
import { Permission as PermissionDto } from '#src/application/dtos/Permission';
export interface Authorizationable {
  getRoutePermission(route: string, method: string): PermissionDto;
  getUserPermissions(token: string): Promise<PermissionEntity[]>;
  authorize(route: string, method: string, token: string): Promise<boolean>;
}
