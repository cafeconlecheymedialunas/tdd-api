import { NextFunction, Request } from 'express';
import { CheckRoutePermissionable } from '../../domain/interfaces/services/CheckRoutePermissionable';
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { Authorizationable } from '../../domain/interfaces/useCases/Authorizationable';
import { ClientException, WrongAuthenticationTokenException } from '../../domain/types/errors';
import { Payload } from '../../domain/types/responseOutputs';

export class Authorization implements Authorizationable {
  private readonly jsonWebTokenService: JsonWebTokenable;
  private readonly checkRoutePermissionService: CheckRoutePermissionable;

  constructor(jsonWebTokenService: JsonWebTokenable, checkRoutePermissionService: CheckRoutePermissionable) {
    this.jsonWebTokenService = jsonWebTokenService;

    this.checkRoutePermissionService = checkRoutePermissionService;
  }

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
   * @param {string} route - The route to authorize access to.
   * @param {string} method - The HTTP method to authorize access to.
   * @param {string} token - The user's token for authentication.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user is authorized or not.
   */
  authorize = async (req: Request): Promise<boolean> => {
    if (req.path.includes('/auth')) return true;

    const token = req.headers.authorization?.split(' ')[1];

    const route = req.baseUrl;

    const method = req.method;

    if (!token || !route || !method) {
      throw new ClientException();
    }
    const decodedUserData = await this.getDecodedUserDatainToken(token);

    const routePermission = this.checkRoutePermissionService.checkRouteAgainstUserPermissions(
      route,
      method,
      decodedUserData.permissions,
    );

    return routePermission;
  };
}
