import { User } from "../../entities/User.entity";

export interface UserRepositoryInterface {
    getAll(): Promise<User[]>
    getById(id: number): Promise<User | undefined>
    add(user: User): Promise<false | User>
    delete(id: number): Promise<boolean>
    update(id: number, user: User): Promise<void>
    generateId(): number // TODO
    getUserByEmail(email: string): Promise<User | undefined>
}