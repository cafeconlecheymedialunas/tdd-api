import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';
import { CheckRoutePermissionable } from '../../domain/interfaces/services/CheckRoutePermissionable';
import { Condition } from '../../domain/types/requestInputs';
import { Permission as PermissionEntity } from '../../domain/entities/Permission';
import { ClientException } from '../../domain/types/errors';
import { Permission as PermissionDto } from '../dtos/Permission';

export class CheckRoutePermission implements CheckRoutePermissionable {
  private readonly permissionRepository: PermissionMockable;

  constructor(permissionRepository: PermissionMockable) {
    this.permissionRepository = permissionRepository;
  }

  /**
   * Checks user permissions against a specific route permission.
   * @param {string} route - The route to check permissions for.
   * @param {string} method - The HTTP method to check permissions for.
   * @param {PermissionEntity[]} userPermissions - An array of user permissions.
   * @returns {boolean} - True if the user has the necessary permissions, false otherwise.
   */
  checkRouteAgainstUserPermissions = (route: string, method: string, userPermissions: PermissionEntity[]): boolean => {
    const routePermission = this.getPermissionRoute(route, method);

    const permissionsMatch = userPermissions.filter((elem) => elem.id === routePermission.id);

    return permissionsMatch.length > 0 ? true : false;
  };

  /**
   * Retrieves the permission route based on the given route and method. Each route has a unique permission.
   * @param {string} route - The route to search for.
   * @param {string} method - The HTTP method to search for.
   * @returns {PermissionDto} - The permission route that matches the given route and method.
   * @throws {ClientException} - If no permission route is found or if multiple permission routes are found.
   */
  getPermissionRoute = (route: string, method: string): PermissionDto => {
    const QUERY_FILTERS = [
      { key: 'route', condition: Condition.Equal, value: route },
      { key: 'method', condition: Condition.Equal, value: method },
    ];

    const permissionRoute = this.permissionRepository.filter(QUERY_FILTERS);

    if (permissionRoute.length !== 1)
      throw new ClientException(500, 'Its impossible check User Permissions against this Route');

    return permissionRoute[0];
  };
}
