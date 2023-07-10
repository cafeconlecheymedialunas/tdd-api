import DataMapperInterface from "../../domain/interfaces/datamappers/UserDataMapperInterface";
import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface";
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
    async map(id: number, name: string, email: string, password: string, roles: number[]): Promise<UserDto | false> {

        const selectedRoles = await this.getRoles(roles)
        if (!selectedRoles) return false
        return {
            id,
            name,
            email,
            password,
            roles: selectedRoles
        }
    }
}