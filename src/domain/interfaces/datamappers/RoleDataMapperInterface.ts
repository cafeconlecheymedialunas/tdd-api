import { RoleDto } from "../../../application/dtos/RoleDto";

export default interface RoleDataMapperInterface {
    map(id: number, name: string, permissions: number[]): Promise<RoleDto | false>
}