import { CheckRoutePermissionable } from '../../domain/interfaces/services/CheckRoutePermissionable';
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { Authorizationable } from '../../domain/interfaces/useCases/Authorizationable';
import { WrongAuthenticationTokenException } from '../../domain/types/errors';
import { Payload } from '../../domain/types/responseOutputs';

export class Authorization implements Authorizationable {
  private readonly jsonWebTokenService: JsonWebTokenable;
  private readonly checkRoutePermissionService: CheckRoutePermissionable;

  constructor(jsonWebTokenService: JsonWebTokenable, checkRoutePermissionService: CheckRoutePermissionable) {
    this.jsonWebTokenService = jsonWebTokenService;

    this.checkRoutePermissionService = checkRoutePermissionService;
  }

  /**
   * Decodes the user Data contained in Token. This method really check login credentials of user
   * @param {string} token - The token to decode.
   * @returns {Promise<Payload>} - A promise that resolves to the decoded token.
   * @throws {WrongAuthenticationTokenException} - If the token cannot be decoded.
   */
  private getDecodedUserDatainToken = async (token: string): Promise<Payload> => {
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
  authorize = async (route: string, method: string, token: string): Promise<boolean> => {
    const decodedUserData = await this.getDecodedUserDatainToken(token);

    const routePermission = this.checkRoutePermissionService.checkRouteAgainstUserPermissions(
      route,
      method,
      decodedUserData.permissions,
    );

    return routePermission;
  };
}
