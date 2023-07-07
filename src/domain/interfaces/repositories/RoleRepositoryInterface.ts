import { Role } from "../../entities/Role.entity";
import { User } from "../../entities/User.entity";
import { RoleInterface } from "../entities/RoleInterface";

export interface RoleRepositoryInterface {
    getById(id: number): Promise<Role | undefined>
    add(role: RoleInterface): Promise<false >
 
}