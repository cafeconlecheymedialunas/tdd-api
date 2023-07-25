import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';
// eslint-disable-next-line max-len
import { CheckRoutePermissionable } from '../../domain/interfaces/services/CheckRoutePermissionable';
import { Condition } from '../../domain/types/response';
import { Permission } from '../../domain/entities/Permission';
import { PermissionNotFoundException } from '../../domain/types/errors';
import { Permission as PermissionDto } from '../dtos/Permission';

export class CheckRoutePermission implements CheckRoutePermissionable {
  private readonly repository: PermissionMockable;
  permissionRoute: Permission | false = false;

  constructor(repository: PermissionMockable) {
    this.repository = repository;
  }

  /**
   * Checks if a user has the necessary permissions to access a specific route with a given method.
   * @param {string} route - The route to check permissions for.
   * @param {string} method - The HTTP method to check permissions for.
   * @param {Permission[]} userPermissions - An array of user permissions.
   * @returns {boolean} - True if the user has the necessary permissions, false otherwise.
   * @throws {PermissionNotFoundException} - If the permission for the route and method is not found.
   */
  checkRouteWithUserPermissions = (route: string, method: string, userPermissions: Permission[]): boolean => {
    const routePermission = this.getPermissionRoute(route, method);

    if (!routePermission) throw new PermissionNotFoundException();

    const permission = userPermissions.filter((elem) => {
      if (elem.id === routePermission.id) {
        return elem;
      }
    });

    return permission.length > 0 ? true : false;
  };

  /**
   * Retrieves the permission route based on the given route and method.
   * @param {string} route - The route to search for.
   * @param {string} method - The HTTP method to search for.
   * @returns {PermissionDto} - The permission route that matches the given route and method.
   * @throws {PermissionNotFoundException} - If no permission route is found or if multiple permission routes are found.
   */
  private getPermissionRoute = (route: string, method: string): PermissionDto => {
    const conditions = [
      { key: 'route', condition: Condition.Equal, value: route },
      { key: 'method', condition: Condition.Equal, value: method },
    ];

    const permissionRoute = this.repository.filter(conditions);

    if (permissionRoute.length !== 1) throw new PermissionNotFoundException();

    return permissionRoute[0];
  };
}
