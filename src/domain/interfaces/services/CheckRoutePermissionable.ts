import { Permission as PermissionEntity } from 'domain/entities/Permission';

export interface CheckRoutePermissionable {
  checkRouteAgainstUserPermissions(route: string, method: string, userPermissions: PermissionEntity[]): boolean;
}
