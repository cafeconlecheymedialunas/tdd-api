import { Permission } from '../../entities/Permission';

export interface CheckRoutePermissionable {
  checkRouteAgainstUserPermissions(route: string, method: string, userPermissions: Permission[]): boolean;
}
