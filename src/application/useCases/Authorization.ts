// eslint-disable-next-line max-len
import { CheckRoutePermissionable } from '../../domain/interfaces/services/CheckRoutePermissionable';
import { JsonWebTokenable } from '../../domain/interfaces/services/JsonWebTokenable';
import { Authorizationable } from '../../domain/interfaces/useCases/Authorizationable';
import { WrongAuthenticationTokenException } from '../../domain/types/errors';

export class Authorization implements Authorizationable {
  private readonly jsonWebToken: JsonWebTokenable;
  private readonly checkRoutePermission: CheckRoutePermissionable;

  constructor(jsonWebToken: JsonWebTokenable, checkRoutePermission: CheckRoutePermissionable) {
    this.jsonWebToken = jsonWebToken;

    this.checkRoutePermission = checkRoutePermission;
  }

  /**
   * Decodes the given token using a jsonWebToken library.
   * @param {string} token - The token to decode.
   * @returns {Promise<any>} - A promise that resolves to the decoded token.
   * @throws {WrongAuthenticationTokenException} - If the token cannot be decoded.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getDecodedToken = async (token: string): Promise<any> => {
    const decodedToken = await this.jsonWebToken.decode(token);

    if (!decodedToken) {
      throw new WrongAuthenticationTokenException();
    }
    return decodedToken;
  };

  /**
   * Authorizes a user's access to a specific route and method using a token.
   * @param {string} route - The route to authorize access to.
   * @param {string} method - The HTTP method to authorize access to.
   * @param {string} token - The user's token for authentication.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user is authorized or not.
   */
  authorize = async (route: string, method: string, token: string): Promise<boolean> => {
    const decodedToken = await this.getDecodedToken(token);

    const routePermission = this.checkRoutePermission.checkRouteWithUserPermissions(
      route,
      method,
      decodedToken.permissions,
    );

    return routePermission;
  };
}
