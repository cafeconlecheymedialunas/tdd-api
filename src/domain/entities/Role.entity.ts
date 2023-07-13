import { RoleInterface } from "../interfaces/entities/RoleInterface";
import { Permission } from "./Permission.entity";

export class Role implements RoleInterface {
    name: string
    id: number
    permissions: number[];

    constructor(id: number, name: string, permissions: number[]) {
        this.name = name;
        this.id = id
        this.permissions = permissions
    }
}
