import { RoleDto } from "../../../application/dtos/RoleDto";

export default interface RoleDataMapperInterface {
    map(id: number, name: string, email: string, password: string, roles: number[]): Promise<RoleDto | false>
}