import { PermissionInterface } from "../types/roles.types";



export class Permission implements PermissionInterface{
    id: number
    route: string
    method:string

    constructor(route:string,method:string,id: number) {
        this.route = route;
        this.id = id
        this.method = method
    }

}



