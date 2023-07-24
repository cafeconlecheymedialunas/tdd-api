import { Permission } from '../../entities/Permission';

export interface CheckRoutePermissionable {
  checkRouteWithUserPermission(route: string, method: string, userPermissions: Permission[]): Promise<boolean>;
}
