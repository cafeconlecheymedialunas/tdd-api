import { Permission } from "../../entities/Permission.entity";
export interface RoleDtoInterface {
    id: number,
    name: string,
    permissions: Permission[]
}