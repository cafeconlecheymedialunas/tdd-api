import { Permission } from '../../entities/Permission';

export interface CheckRoutePermissionServiceInterface {
  checkRouteWithUserPermission(route: string, method: string, userPermissions: Permission[]): Promise<boolean>;
}
