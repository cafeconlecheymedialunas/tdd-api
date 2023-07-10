import { RoleInterface } from "../interfaces/entities/RoleInterface";
import { Permission } from "./Permission.entity";

export class Role implements RoleInterface {
    name: string
    id: number
    permissions: Permission[]
    constructor(id: number, name: string, permissions: Permission[]) {
        this.name = name;
        this.id = id
        this.permissions = permissions
    }
}
