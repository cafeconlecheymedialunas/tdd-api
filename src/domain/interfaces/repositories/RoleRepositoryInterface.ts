import { Permission } from "../../entities/Permission.entity";
import { Role } from "../../entities/Role.entity";
import { User } from "../../entities/User.entity";
import { RoleInterface } from "../entities/RoleInterface";

export interface RoleRepositoryInterface {
    getById(id: number): Promise<Role | undefined>
    add(role: {name:string,permissions:Permission[]}): Promise<false | Role>
 
}