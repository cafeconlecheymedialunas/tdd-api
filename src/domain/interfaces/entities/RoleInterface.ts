import { Permission } from "../../entities/Permission.entity"

export interface RoleInterface {
    id: number,
    name: string
    permissions:Permission[]
}
