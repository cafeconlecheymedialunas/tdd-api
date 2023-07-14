import { Role } from "../../domain/entities/Role.entity"
import RoleDataMapperInterface from "../../domain/interfaces/datamappers/RoleDataMapperInterface"
import { PermissionRepositoryInterface } from "../../domain/interfaces/repositories/PermissionRepositoryInterface"
import { PermissionDto } from "../dtos/PermissionDto"
import { RoleDto } from "../dtos/RoleDto"

export class RoleDtoMapper implements RoleDataMapperInterface {
    private readonly permissionRepository
    constructor(repository: PermissionRepositoryInterface) {
        this.permissionRepository = repository
    }
    async getPermissions(roles: number[]): Promise<PermissionDto[] | false> {
        let selectedPermissions = await Promise.all(roles.map(async (rol) => {
            return await this.permissionRepository.getById(rol)
        }))
        return selectedPermissions.filter((result): result is PermissionDto => result !== undefined) as PermissionDto[] | false;
    }
    async mapItem(role: Role): Promise<RoleDto | false> {
        const selectedPermissions = await this.getPermissions(role.permissions)
        if (!selectedPermissions) return false
        return {
            id: role.id,
            name: role.name,
            permissions: selectedPermissions
        }
    }
    async mapList(roles: Role[]): Promise<RoleDto[] | false> {
        const results = await Promise.all(
            roles.map(async (item: Role) => {
                const roleDto = await this.mapItem(item);
                return roleDto !== false ? roleDto : undefined;
            })
        );
        return results.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
    }
}