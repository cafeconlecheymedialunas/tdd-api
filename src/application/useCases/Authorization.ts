import { Request } from 'express';

import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { Authorizationable } from '../../domain/interfaces/useCases/Authorizationable';
import { ClientException, WrongAuthenticationTokenException } from '../../domain/types/errors';
import { Payload } from '../../domain/types/responseOutputs';
import { Condition } from '../../domain/types/requestInputs';
import { Permission as PermissionEntity } from '../../domain/entities/Permission';
import { Permission as PermissionDto } from '../dtos/Permission';
import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable';

export class Authorization implements Authorizationable {
  private readonly jsonWebTokenService: JsonWebTokenable;
  private readonly permissionRepository: PermissionMockable

  constructor(jsonWebTokenService: JsonWebTokenable, permissionRepository: PermissionMockable) {
    this.jsonWebTokenService = jsonWebTokenService;

    this.permissionRepository = permissionRepository;
  }

  /**
   * Checks if a given route permission matches any of the user permissions.
   * @param {PermissionEntity} routePermission - The permission entity of the route.
   * @param {PermissionEntity[]} userPermissions - The array of user permissions.
   * @returns {boolean} - True if there is a match, false otherwise.
   */
  checkRouteAgainstUserPermissions = (routePermission: PermissionEntity, userPermissions: PermissionEntity[]): boolean => {

    const permissionsMatch = userPermissions.filter((elem) => elem.id === routePermission.id);

    return permissionsMatch.length > 0;
  };

  /**
   * Retrieves the permission route based on the given route and method. Each route has a unique permission.
   * @param {string} route - The route to search for.
   * @param {string} method - The HTTP method to search for.
   * @returns {PermissionDto} - The permission route that matches the given route and method.
   * @throws {ClientException} - If no permission route is found or if multiple permission routes are found.
   */
  getRoutePermission = (route: string, method: string): PermissionDto => {
    const QUERY_FILTERS = [
      { key: 'route', condition: Condition.Equal, value: route },
      { key: 'method', condition: Condition.Equal, value: method },
    ];

    const permissionRoute = this.permissionRepository.filter(QUERY_FILTERS);

    if (permissionRoute.length !== 1)
      throw new ClientException(500, 'Its impossible check User Permissions against this Route');

    return permissionRoute[0];
  };

  /**
   *  Decodes the user data contained in the token. This method checks the user's login credentials.
   * @param {string} token - The authentication token of the user.
   * @returns {Promise<PermissionEntity[]>} - A promise that resolves to an array of PermissionEntity objects representing the user's permissions.
   * @throws {WrongAuthenticationTokenException} - If the provided token is invalid or expired.
   */
  getUserPermissions = async (token: string): Promise<PermissionEntity[]> => {
    const decodedUserData = await this.jsonWebTokenService.decodeToken(token);

    if (!decodedUserData) {
      throw new WrongAuthenticationTokenException();
    }
    return decodedUserData.permissions;
  };


  /**
   * Authorize a user to access a specific route and method using a token.
   * @param {string} route - The route to authorize access to.
   * @param {string} method - The HTTP method to authorize access to.
   * @param {string} token - The user's authentication token.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user is authorized, false otherwise.
   */
  authorize = async (route: string, method: string, token: string): Promise<boolean> => {

    const routePermission = this.getRoutePermission(route, method);

    const userPermissions = await this.getUserPermissions(token);

    const permissionsMatch = this.checkRouteAgainstUserPermissions(
      routePermission,
      userPermissions,
    );

    return permissionsMatch;
  };
}
