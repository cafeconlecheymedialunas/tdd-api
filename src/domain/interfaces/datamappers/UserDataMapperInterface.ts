import { UserDto } from "../../../application/dtos/UserDto";
import { User } from "../../entities/User.entity";

export default interface UserDataMapperInterface {
    mapItem(user: User): Promise<UserDto | false>
    mapList(users: User[]): Promise<UserDto[] | false>
}