import { Role } from "../entities/Role.entity"
import { RolesNames } from "./roles.types"

export interface UserInterface {
    name: string
    email: string
    password: string
    id?: number
}


export type UserRequired = Pick<User, "name" | "password" | "email">;