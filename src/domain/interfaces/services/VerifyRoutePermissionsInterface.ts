import { Permission } from "../../entities/Permission.entity";

export interface VerifyRoutePermissionInterface{
    checkRoutePermission(permission:Permission): boolean
    getPermission(route: string,method:string):Permission
}