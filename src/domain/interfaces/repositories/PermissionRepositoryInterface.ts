import { PermissionDto } from "../../../application/dtos/PermissionDto"
import { Permission } from "../../entities/Permission.entity"
export interface PermissionRepositoryInterface {
    getById(id: number): Promise<PermissionDto>
    getByRouteMethod(route: string, method: string): Promise<Permission>
    getByIdList(role: number[]): Promise<PermissionDto[]>
}