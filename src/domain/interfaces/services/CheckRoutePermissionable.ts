import { Permission } from '../../entities/Permission';

export interface CheckRoutePermissionable {
  checkRouteWithUserPermissions(route: string, method: string, userPermissions: Permission[]): Promise<boolean>;
}
