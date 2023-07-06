import { Permission } from "../../entities/Permission.entity"
import { Role } from "../../entities/Role.entity"

export interface UserDtoInterface {
    name: string
    email: string
    password: string
    id?: number,
    roles: Role[],
    permissions:Permission[]
}