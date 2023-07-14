import { Permission } from '../../entities/Permission.entity';
export interface CheckRoutePermissionInterface {
  checkPermissions(route: string, method: string, userPermissions: Permission[]): Promise<boolean>;
  getPermission(route: string, method: string): Promise<Permission | false>;
}
