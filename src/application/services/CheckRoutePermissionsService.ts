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

    if (!routePermission) throw new PermissionNotFoundException();

    const permission = userPermissions.filter((elem) => {
      if (elem.id === routePermission.id) {
        return elem;
      }
    });

    return permission.length > 0 ? true : false;
  }
  private async getPermissionRoute(route: string, method: string): Promise<PermissionDto> {
    const conditions = [
      { key: 'route', condition: Condition.Equal, value: route },
      { key: 'method', condition: Condition.Equal, value: method },
    ];

    const permissionRoute = await this.repository.filter(conditions);

    if (permissionRoute.length !== 1) throw new PermissionNotFoundException();

    return permissionRoute[0];
  }
}
