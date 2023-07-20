// eslint-disable-next-line max-len
import { CheckRoutePermissionServiceInterface } from '../../domain/interfaces/services/CheckRoutePermissionsable';
import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenable';
import { AuthorizationUseCaseInterface } from '../../domain/interfaces/useCases/Authorizationable';
import { WrongAuthenticationTokenException } from '../../domain/types/errors';

export class AuthorizationUseCase implements AuthorizationUseCaseInterface {
  private readonly jsonWebTokenService: JsonWebTokenServiceInterface;
  private readonly checkRoutePermission: CheckRoutePermissionServiceInterface;

  constructor(
    jsonWebTokenService: JsonWebTokenServiceInterface,
    checkRoutePermission: CheckRoutePermissionServiceInterface,
  ) {
    this.jsonWebTokenService = jsonWebTokenService;

    this.checkRoutePermission = checkRoutePermission;
  }

  getDecodedToken = async(token:string) =>{
    const decodedToken = await this.jsonWebTokenService.decode(token);

    if (!decodedToken) {
      throw new WrongAuthenticationTokenException();
    }
    return decodedToken
  }
  authorize = async (route: string, method: string, token: string): Promise<boolean> => {
    
    const decodedToken = await this.getDecodedToken(token)

    const routePermission = await this.checkRoutePermission.checkRouteWithUserPermission(
      route,
      method,
      decodedToken.permissions,
    );

    return routePermission;
  };
}
