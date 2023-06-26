import { UserInterface } from "../types/user.types"

export interface UserRepositoryInterface{
    list: [],
    getAll() : UserInterface[]
    getById(id:number): UserInterface
    add(user:UserInterface): void
    delete(id:number): void
    update(id:number,user:UserInterface) : void
}