import { Role } from "../../domain/entities/Role.entity"
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