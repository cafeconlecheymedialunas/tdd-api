

import { UserRepositoryInterface } from "../interfaces/repositories/UserRepositoryInterface"
import { Role, UserInterface } from "../types/user.types"
import { User } from "../entities/User.entity"

export class UserMockRepository implements UserRepositoryInterface {
    list: Array<User> = [];

    getAll = (): User[] => {
        return this.list
    };
  
    getById = (id:number) : User => {
        this.list.find((elem)=> elem.id === id)
        return this.list[0]
    }

    add = (user: User): false | User => {
        const id = this.generateId()

        const newUser = new User (
            user.name,
            user.email,
            user.password,
            id
        )

        this.list.push(newUser);

        return newUser

    }
    
    delete = (id:number): void => {
        this.list = this.list.filter(item => item.id !== id);
    }

    update = (id: number, user: UserInterface): void => {
        const index = this.list.findIndex((elem) => elem.id === id);
        if (index !== -1) {
          this.list[index] = user;
        }
    };

    generateId(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000); // Número aleatorio entre 0 y 999999
        const uniqueNumber = timestamp + random;
        return uniqueNumber;
      }

      getUserByEmail = (email:string): User | undefined => {
          console.log(this.list)
        const user = this.list.find(function (elem) {
            return elem.email === email
        })
        return user
    };
}