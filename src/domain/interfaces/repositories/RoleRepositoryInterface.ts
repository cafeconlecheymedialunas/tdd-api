import { RoleDto } from "../../../application/dtos/RoleDto";
import { Permission } from "../../entities/Permission.entity";
import { Role } from "../../entities/Role.entity";
export interface RoleRepositoryInterface {
    getById(id: number): Promise<Role | undefined>
    add(role: { name: string, permissions: Permission[] }): Promise<false | Role>
    getByIdList(role: number[]): Promise<RoleDto[] | undefined>
}