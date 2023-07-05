import { PermissionInterface, PermissionsNames, RoleInterface, RolesIds, RolesNames } from "../types/roles.types";


export class Permission implements PermissionInterface{
    id: number
    name: PermissionsNames

    constructor(name: PermissionsNames, id: number) {
        this.name = name;
        this.id = id
    }

}



