import { User } from "../../domain/entities/User.entity";
import DataMapperInterface from "../../domain/interfaces/datamappers/UserDataMapperInterface"
import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface"
import { UserDto } from "../dtos/UserDto";
import { RoleDto } from "../dtos/RoleDto";
import { Role } from "../../domain/entities/Role.entity";

export class UserDtoMapper implements DataMapperInterface {
    private readonly roleRepository

    constructor(repository: RoleRepositoryInterface) {
        this.roleRepository = repository
    }
    async getRoles(roles: number[]): Promise<RoleDto[] | false> {
        let selectedRoles = await Promise.all(roles.map(async (rol) => {
            return await this.roleRepository.getById(rol)
        }))
        return selectedRoles.filter((result): result is RoleDto => result !== undefined) as RoleDto[] | false;
    }


    async mapItem(user: User): Promise<UserDto | false> {
        const selectedRoles = await this.getRoles(user.roles)
        if (!selectedRoles) return false
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            roles: selectedRoles
        }
    }
    async mapList(users: User[]): Promise<UserDto[] | false> {
        const results = await Promise.all(
            users.map(async (item: User) => {
                const userDto = await this.mapItem(item);
                return userDto !== false ? userDto : undefined;
            })
        );
        return results.filter((result): result is UserDto => result !== undefined) as UserDto[] | false;
    }
}