import { User } from "../../domain/entities/User.entity";
import DataMapperInterface from "../../domain/interfaces/datamappers/UserDataMapperInterface"
import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface"
import { UserDto } from "../dtos/UserDto";

export class UserDtoMapper implements DataMapperInterface {
    private readonly roleRepository
    constructor(repository: RoleRepositoryInterface) {
        this.roleRepository = repository
    }
    async getRoles(roles: number[]) {
        const selectedRoles = await this.roleRepository.getByIdList(roles)
        return selectedRoles
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