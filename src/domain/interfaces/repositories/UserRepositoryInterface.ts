import { User } from "../../entities/User.entity";

export interface UserRepositoryInterface {
    list: User[];
    getAll(): User[]
    getById(id: number): User
    add(user: User): Promise<false | User>
    delete(id: number): void
    update(id: number, user: User): void
    generateId(): number // TODO
    getUserByEmail(email: string): User | undefined
    getUserByEmailAndPassword(email: string, password: string): User | undefined
}