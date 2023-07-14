import { RoleDto } from "../../../application/dtos/RoleDto"
export interface UserDtoInterface {
    id: number,
    name: string
    email: string
    password:string
    roles: RoleDto[]
}