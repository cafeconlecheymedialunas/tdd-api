
import { type User } from '../../domain/entities/User.entity'
import { type UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface'
import { CheckRoutePermissionInterface } from '../../domain/interfaces/services/CheckRoutePermissionsInterface'
import { HashPasswordServiceInterface } from '../../domain/interfaces/services/HashPasswordServiceInterface'
import { JsonWebTokenServiceInterface } from '../../domain/interfaces/services/JsonWebTokenServiceInterface'
import { CheckUserPermissionsUseCaseInterface } from '../../domain/interfaces/useCases/CheckUserPermissionsUseCaseInterface'
import { type RegisterUseCaseInterface } from '../../domain/interfaces/useCases/RegisterUseCaseInterface'
import { UserDto } from '../dtos/UserDto'


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
      throw new Error("Token is invalid")
    }

    const checkPermissions = this.checkRoutePermission.check(route, method, decodedToken.permissions)
    console.log(checkPermissions)
    return true
  }

}