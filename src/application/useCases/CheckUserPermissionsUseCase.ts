import { CheckRoutePermissionInterface } from '../../domain/interfaces/services/CheckRoutePermissionsInterface'
import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface'
import { CheckUserPermissionsUseCaseInterface } from '../../domain/interfaces/useCases/CheckUserPermissionsUseCaseInterface'
import { HttpStatuses } from '../../domain/types/response'
import { ClientError } from '../../infraestructure/utils'
export class CheckUserPermissionsUseCase implements CheckUserPermissionsUseCaseInterface {
  private readonly jsonWebTokenService: JsonWebTokenServiceInterface
  private readonly checkRoutePermission: CheckRoutePermissionInterface
  constructor(jsonWebTokenService: JsonWebTokenServiceInterface, checkRoutePermission: CheckRoutePermissionInterface) {
    this.jsonWebTokenService = jsonWebTokenService
    this.checkRoutePermission = checkRoutePermission
  }
  async check(route: string, method: string, token: string): Promise<boolean> {
    const decodedToken = await this.jsonWebTokenService.decode(token)
    if (!decodedToken) {
      throw new ClientError('The request could not be made, try again later.', HttpStatuses.UNAUTHORIZED)
    }
    const checkPermissions = this.checkRoutePermission.check(route, method, decodedToken.permissions)
    return true
  }
}