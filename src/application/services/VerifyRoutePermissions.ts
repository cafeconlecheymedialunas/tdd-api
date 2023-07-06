import { Permission } from "../../domain/entities/Permission.entity";
import { VerifyRoutePermissionInterface } from "../../domain/interfaces/services/VerifyRoutePermissionsInterface";
export class VerifyRoutePermission implements VerifyRoutePermissionInterface{
    checkRoutePermission(permission: Permission):boolean {
        
    }
    getPermission(route: string, method: string): Permission{
        
    }
}