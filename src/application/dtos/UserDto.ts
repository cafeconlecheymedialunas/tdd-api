
import { Role } from "../../domain/entities/Role.entity"
import { UserDtoInterface } from "../../domain/interfaces/dtos/UserDtoInterface"

export class UserDto implements UserDtoInterface {
    id?: number
    name: string
    email: string
    password: string
    roles: Role[]

    constructor(id: number, name: string, email: string, password: string, roles: Role[]) {
        this.name = name;
        this.email = email;
        this.id = id
        this.password = password
        this.roles = roles
    }

}