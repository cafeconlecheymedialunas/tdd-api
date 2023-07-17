import { CheckRoutePermissionInterface } from '../../domain/interfaces/services/CheckRoutePermissionsInterface';

import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface';

import { CheckUserPermissionsUseCaseInterface } from '../../domain/interfaces/useCases/CheckUserPermissionsUseCaseInterface';
import { WrongAuthenticationTokenException } from '../../domain/types/response';

export class CheckUserPermissionsUseCase implements CheckUserPermissionsUseCaseInterface {
  private readonly jsonWebTokenService: JsonWebTokenServiceInterface;
  private readonly checkRoutePermission: CheckRoutePermissionInterface;
  constructor(jsonWebTokenService: JsonWebTokenServiceInterface, checkRoutePermission: CheckRoutePermissionInterface) {
    this.jsonWebTokenService = jsonWebTokenService;

    this.checkRoutePermission = checkRoutePermission;
  }
  async check(route: string, method: string, token: string): Promise<boolean> {
    const decodedToken = await this.jsonWebTokenService.decode(token);

    if (!decodedToken) {
      throw new WrongAuthenticationTokenException();
    }

    const routePermission = await this.checkRoutePermission.checkRouteWithUserPermission(
      route,
      method,
      decodedToken.permissions,
    );

    return decodedToken.id ? true : false;
  }
}
