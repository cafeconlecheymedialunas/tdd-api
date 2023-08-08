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
  /**
   * Decodes the user data contained in the token. This method checks the user's login credentials.
   * @param {string} token - The token to decode.
   * @returns {Promise<Payload>} - A promise that resolves to the decoded token.
   * @throws {WrongAuthenticationTokenException} - If the token cannot be decoded.
   */
  getDecodedUserDatainToken = async (token: string): Promise<Payload> => {
    const decodedUserData = await this.jsonWebTokenService.decodeToken(token);

    if (!decodedUserData) {
      throw new WrongAuthenticationTokenException();
    }
    return decodedUserData;
  };

  /**
   * Authorizes a user's access to a specific route checking against Users to Route Permision.
   * @param {Request} req - The Request Express Object.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user is authorized or not.
   */
  authorize = async (route: string, method: string, token: string): Promise<boolean> => {


    const decodedUserData = await this.getDecodedUserDatainToken(token);

    const routePermission = this.checkRouteAgainstUserPermissions(
      route,
      method,
      decodedUserData.permissions,
    );

    return routePermission;
  };
}
