import { JsonWebTokenable } from '../interfaces/services/JsonWebTokenable';
import { WrongAuthenticationTokenException } from '../errors';
import { Permission as PermissionDto } from '../dtos/auth/Permission';
import { Permissionable } from '../interfaces/repositories/auth/Permissionable';
import { Operations, QueryFilter } from 'core/types/database';
import { where } from 'sequelize';

export class Authorization {
  private readonly jsonWebTokenService: JsonWebTokenable;
  private readonly permissionRepository: Permissionable;

  constructor(jsonWebTokenService: JsonWebTokenable, permissionRepository: Permissionable) {
    this.jsonWebTokenService = jsonWebTokenService;

    this.permissionRepository = permissionRepository;
  }

  /**
   * Checks if a given route permission matches any of the user permissions.
   * @param {PermissionDto} routePermission - The permission dto of the route.
   * @param {PermissionDto[]} userPermissions - The array of user permissions.
   * @returns {boolean} - True if there is a match, false otherwise.
   */
  checkRouteAgainstUserPermissions = (routePermission: PermissionDto, userPermissions: PermissionDto[]): boolean => {
    const permissionsMatch = userPermissions.filter((elem) => elem.getId() === routePermission.getId());

    return permissionsMatch.length > 0;
  };

  /**
   * Retrieves the permission route based on the given route and method. Each route has a unique permission.
   * @param {string} route - The route to search for.
   * @param {string} method - The HTTP method to search for.
   * @returns {PermissionDto} - The permission route that matches the given route and method.
   * @throws {ClientException} - If no permission route is found or if multiple permission routes are found.
   */
  getRoutePermission = async(route: string, method: string): Promise<PermissionDto> => {
  

    const whereClause: QueryFilter = {
      [Operations.and]: [{ route: route }, { method: method }],      
    };

    const permissionRoute = await this.permissionRepository.filter(whereClause);

    if (permissionRoute.length !== 1) throw new WrongAuthenticationTokenException();

    return permissionRoute[0];
  };

  /**
   *  Decodes the user data contained in the token. This method checks the user's login credentials.
   * @param {string} token - The authentication token of the user.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of PermissionDto objects representing the user's permissions.
   * @throws {WrongAuthenticationTokenException} - If the provided token is invalid or expired.
   */
  getUserPermissions = async (token: string): Promise<PermissionDto[]> => {
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
    const routePermission = await this.getRoutePermission(route, method);

    const userPermissions = await this.getUserPermissions(token);

    const permissionsMatch = this.checkRouteAgainstUserPermissions(routePermission, userPermissions);

    return permissionsMatch;
  };
}
