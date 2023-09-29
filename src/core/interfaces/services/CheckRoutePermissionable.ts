import { Permission as PermissionEntity } from '../../entities/auth/Permission';

export interface CheckRoutePermissionable {
  checkRouteAgainstUserPermissions(route: string, method: string, userPermissions: PermissionEntity[]): boolean;
}
