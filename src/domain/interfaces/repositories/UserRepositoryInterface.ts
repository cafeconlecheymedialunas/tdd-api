import { User } from "../../entities/User.entity";

export interface UserRepositoryInterface{
    list: User[];
    getAll() : User[]
    getById(id:number): User
    add(user:User): false | User
    delete(id:number): void
    update(id:number,user:User) : void
    // TODO
    generateId():number

}