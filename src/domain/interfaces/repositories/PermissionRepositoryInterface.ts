import { PermissionDto } from "../../../application/dtos/PermissionDto"
import { Permission } from "../../entities/Permission.entity"
export interface PermissionRepositoryInterface {
    getById(id: number): Promise<PermissionDto | undefined>
    getByRouteMethod(route: string, method: string): Promise<Permission | false>
    getByIdList(role: number[]): Promise<PermissionDto[] | undefined>
}