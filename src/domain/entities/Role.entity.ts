import { PermissionsNames, RoleInterface, RolesIds, RolesNames } from "../types/roles.types";
import { Permission } from "./Permission.entity";


export class Role implements RoleInterface{
    name: RolesNames
    id: RolesIds
    permissions: Permission[]

    constructor(name: RolesNames, id: RolesIds, permissions: Permission[]) {
        this.name = name;
        this.id = id
        this.permissions = permissions
    }

}



