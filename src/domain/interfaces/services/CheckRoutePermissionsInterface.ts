import { Permission } from "../../entities/Permission.entity";
export interface CheckRoutePermissionInterface {
    check(route: string, method: string, userPermissions: Permission[]): Promise<boolean>
    getPermission(route: string, method: string): Promise<Permission | false>
}