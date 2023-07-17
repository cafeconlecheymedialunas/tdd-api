import { Permission } from '../../entities/Permission.entity';

export interface CheckRoutePermissionInterface {
  checkRouteWithUserPermission(route: string, method: string, userPermissions: Permission[]): Promise<boolean>;
}
