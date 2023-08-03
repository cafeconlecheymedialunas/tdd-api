import { Roleable as RoleMapperable } from '../../domain/interfaces/mappers/Roleable'
import { PermissionMockable } from '../../domain/interfaces/repositories/PermissionMockable'
import { Role as RoleEntity } from '../../domain/entities/Role'
import { Permission as PermissionDto } from '../dtos/Permission'
import { Role as RoleDto } from '../dtos/Role'

export class Role implements RoleMapperable {
  private readonly permissionRepository

  constructor (permissionRepository: PermissionMockable) {
    this.permissionRepository = permissionRepository
  }
<<<<<<< HEAD

  private readonly getPermissions = (roles: number[]): PermissionDto[] | false => {
    const selectedPermissions = roles.map((rol) => {
      return this.permissionRepository.getById(rol)
    })

    return selectedPermissions.filter((result): result is PermissionDto => result !== undefined) as
      | PermissionDto[]
      | false
  }

  mapItem = (role: RoleEntity): RoleDto | false => {
    const selectedPermissions = this.getPermissions(role.permissions)

    if (selectedPermissions === false) return false
=======
  getPermissions = (roles: number[]): PermissionDto[] => {
    const selectedPermissions = this.permissionRepository.getByIdList(roles);

    return selectedPermissions;
  };

  mapItem = (role: RoleEntity): RoleDto => {
    const selectedPermissions = this.getPermissions(role.permissions);

>>>>>>> refactor
    return {
      id: role.id,
      name: role.name,
      permissions: selectedPermissions
    }
  }

<<<<<<< HEAD
  mapList = (roles: RoleEntity[]): RoleDto[] | false => {
    const results = roles.map((item: RoleEntity) => {
      const roleDto = this.mapItem(item)

      return roleDto !== false ? roleDto : undefined
    })

    return results.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false
  }
=======
  mapList = (roles: RoleEntity[]): RoleDto[] => {
    const results = roles.map((item: RoleEntity) => this.mapItem(item));

    return results;
  };
>>>>>>> refactor
}
