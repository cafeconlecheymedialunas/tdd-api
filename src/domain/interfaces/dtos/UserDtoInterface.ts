import { Role } from "../../entities/Role.entity"
export interface UserDtoInterface {
    name: string
    email: string
    id?: number,
    roles: Role[]
}