
import { RoleInterface } from "../types/roles.types";
import { Permission } from "./Permission.entity";


export class Role implements RoleInterface{
    name: string
    id: number
    permissions: Permission[]

    constructor(name: string, id: number, permissions: Permission[]) {
        this.name = name;
        this.id = id
        this.permissions = permissions
    }

}



