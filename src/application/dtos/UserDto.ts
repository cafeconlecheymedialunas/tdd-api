
import { UserInterface } from "../../domain/types/user.types"
import { Role } from "../../domain/entities/Role.entity"

export class UserDto implements UserDtoInterface{
    name: string
    email: string
    password: string
    id?: number
    roles: number[]

    constructor(name: string, email: string, password: string, id: number, roles: number[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id
        this.roles = roles
    }

}