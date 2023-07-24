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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDecodedToken = async (token: string): Promise<any> => {
    const decodedToken = await this.jsonWebToken.decode(token);

    if (!decodedToken) {
      throw new WrongAuthenticationTokenException();
    }
    return decodedToken;
  };

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
