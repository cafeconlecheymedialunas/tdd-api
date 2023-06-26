

import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface"
import { Role, UserInterface } from "../types/user.types"
import { User } from "../entities/User"

/*
list: []
,getAll() : UserInterface[]
getById(id:number): UserInterface
add(user:UserInterface[]): void
delete(id:number): void
update(id:number,user:UserInterface) : void*/
export class UserMockRepository implements UserRepositoryInterface {
    #list: Array<User> = []



    add = (user:UserInterface): void => {
 
        const id = this.generateId()
        const newUser = new User(user.email,user.password,user.name,[],id)
        this.#list.push(newUser)
    }

    delete = (email:string) => {
        this.#list = this.#list.filter(item => item.email !== email);
    }

    getAll = () => {
      return this.#list
    }

    
    getById = (id:number) => {
        return this.#list.filter((elem)=> elem.id === id)
    }

    update = (id:number) => {
        return this.#list.filter((elem)=> elem.id === id)
    }
    generateId() {
        const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
        return uint32;
    }
}