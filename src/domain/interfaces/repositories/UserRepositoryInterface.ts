import { UserDto } from "../../../application/dtos/UserDto";
import { User } from "../../entities/User.entity";

export interface UserRepositoryInterface {
    getAll(): Promise<User[]>
    getById(id: number): Promise<User | undefined>
    add(user: {email:string,password:string,name:string,roles:number[]}): Promise<false | UserDto>
    delete(id: number): Promise<boolean>
    update(user: { id: number, name: string, password: string, email: string, roles: number[] }): Promise<void>
    generateId(): number // TODO
    getUserByEmail(email: string): Promise<User | undefined>
}