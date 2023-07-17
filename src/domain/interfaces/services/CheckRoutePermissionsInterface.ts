import { Permission } from '../../entities/Permission.entity';

export interface CheckRoutePermissionInterface {
  checkRouteWithUserPermission(route: string, method: string, userPermissions: Permission[]): Promise<boolean>;
  getPermissionRoute(route: string, method: string): Promise<Permission>;
}
