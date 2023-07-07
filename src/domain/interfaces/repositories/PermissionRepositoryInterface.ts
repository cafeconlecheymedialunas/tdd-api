import { Permission } from "../../entities/Permission.entity"


export interface PermissionRepositoryInterface {
   
    getByRouteMethod(route:string,method:string):Promise<Permission | false>
}