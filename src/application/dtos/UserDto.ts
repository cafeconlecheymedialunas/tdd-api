
import { Role } from "../../domain/entities/Role.entity"
import { UserDtoInterface } from "../../domain/interfaces/dtos/UserDtoInterface"

export class UserDto implements UserDtoInterface{
    name: string
    email: string
    id?: number
    roles: Role[]

    constructor(id: number,name: string, email: string, roles: Role[]) {
        this.name = name;
        this.email = email;
        this.id = id
        this.roles = roles
    }

}