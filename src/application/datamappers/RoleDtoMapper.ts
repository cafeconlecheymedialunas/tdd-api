import RoleDataMapperInterface from "../../domain/interfaces/datamappers/RoleDataMapperInterface"
import { PermissionRepositoryInterface } from "../../domain/interfaces/repositories/PermissionRepositoryInterface"
import { RoleDto } from "../dtos/RoleDto"

export class RoleDtoMapper implements RoleDataMapperInterface {
    private readonly permissionRepository
    constructor(repository: PermissionRepositoryInterface) {
        this.permissionRepository = repository
    }
    async getPermissions(permissions: number[]) {
        const selectedPermissions = await this.permissionRepository.getByIdList(permissions)
        return selectedPermissions
    }
    async map(id: number, name: string, permissions: number[]): Promise<RoleDto | false> {
        const selectedPermissions = await this.getPermissions(permissions)
        if (!selectedPermissions) return false
        return {
            id,
            name,
            permissions: selectedPermissions
        }
    }
}