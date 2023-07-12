import { Permission } from "../../domain/entities/Permission.entity";
import { PermissionRepositoryInterface } from "../../domain/interfaces/repositories/PermissionRepositoryInterface";
import { CheckRoutePermissionInterface } from "../../domain/interfaces/services/CheckRoutePermissionsInterface";
import { ClientError } from "../../infraestructure/utils";
export class CheckRoutePermissionsService implements CheckRoutePermissionInterface {
    private readonly repository: PermissionRepositoryInterface
    permissionRoute: Permission | false = false
    constructor(repository: PermissionRepositoryInterface) {
        this.repository = repository
    }
    async checkPermissions(route: string, method: string, userPermissions: Permission[]): Promise<boolean> {

        const routePermission = await this.getPermission(route, method)
        if (!routePermission) return false
        const permission = userPermissions.find((elem) => {
            elem.id == routePermission.id
        })
        return (permission) ? true : false
    }
    async getPermission(route: string, method: string): Promise<Permission> {
        const result = await this.repository.getByRouteMethod(route, method)
        if (!result) throw new ClientError('No se encontro', 400)
        return result
    }
}