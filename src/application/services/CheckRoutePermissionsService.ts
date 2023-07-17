import { Permission } from '../../domain/entities/Permission.entity';

import { PermissionRepositoryInterface } from '../../domain/interfaces/repositories/PermissionRepositoryInterface';

import { CheckRoutePermissionInterface } from '../../domain/interfaces/services/CheckRoutePermissionsInterface';
import { Condition } from '../../domain/types/inputsParams';

import { PermissionNotFoundException } from '../../domain/types/response';
import { PermissionDto } from '../dtos/PermissionDto';

export class CheckRoutePermissionsService implements CheckRoutePermissionInterface {
  private readonly repository: PermissionRepositoryInterface;
  permissionRoute: Permission | false = false;
  constructor(repository: PermissionRepositoryInterface) {
    this.repository = repository;
  }
  async checkRouteWithUserPermission(route: string, method: string, userPermissions: Permission[]): Promise<boolean> {
    const routePermission = await this.getPermissionRoute(route, method);

    console.log(routePermission, 'Route Permissions');
    if (!routePermission) return false;

    const permission = userPermissions.find((elem) => {
      elem.id == routePermission.id;
    });

    return permission ? true : false;
  }
  private async getPermissionRoute(route: string, method: string): Promise<PermissionDto> {
    const conditions = [
      { key: 'route', condition: Condition.Equal, value: route },
      { key: 'method', condition: Condition.Equal, value: method },
    ];

    console.log(route, 'route');
    console.log(method, 'method');
    const permissionRoute = await this.repository.filter(conditions);

    console.log(permissionRoute);
    if (permissionRoute.length !== 1) throw new PermissionNotFoundException();

    return permissionRoute[0];
  }
}
