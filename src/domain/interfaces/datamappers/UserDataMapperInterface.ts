import { UserDto } from "../../../application/dtos/UserDto";

export default interface UserDataMapperInterface {
    map(id: number, name: string, email: string, password: string, roles: number[]): Promise<UserDto | false>
}