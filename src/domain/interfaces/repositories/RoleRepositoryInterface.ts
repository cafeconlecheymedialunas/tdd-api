import { RoleDto } from "../../../application/dtos/RoleDto";
export interface RoleRepositoryInterface {
    getById(id: number): Promise<RoleDto>
    add(role: { name: string, permissions: number[] }): Promise<RoleDto>
    getByIdList(role: number[]): Promise<RoleDto[]>
}