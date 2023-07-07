import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface"
import { User } from "../../domain/entities/User.entity"

import { MockRepository } from "./MockRepository";
import { RoleMockRepository } from "./RoleMockRepository";
export class UserMockRepository extends MockRepository implements UserRepositoryInterface {
  list: User[] = [];
  collection = 'users'


  


  async getAll(): Promise<User[]> {
    try {
      this.list = await this.readFile(this.collection);

      return this.list
    } catch (error) {

      return []
    }
  };

  async getById(id: number): Promise<User | undefined> {
    try {
      this.list = await this.readFile(this.collection);
      const user = this.list.find(function (elem) {
        return elem.id === id
      })
      return (user !== undefined) ? user : undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async add(user: { name: string, password: string, email: string, roles: number[] }): Promise<false | User> {
    try {
      const id = this.generateId()
      this.list = await this.readFile(this.collection);

      const newUser = new User(
        user.name,
        user.email,
        user.password,
        id
      )

      const rolesRepository  = new RoleMockRepository()
      console.log(await rolesRepository.getByIdList(user.roles)) 
      this.list.push(newUser);
      await this.writeFile(this.collection, this.list);
      return newUser
    } catch (error) {
      return false
    }
  }



  async delete(id: number): Promise<boolean> {
    try {
      this.list = await this.readFile(this.collection);
      const index = this.list.findIndex(item => item.id === id);
      if (index !== -1) {
        this.list.splice(index, 1);
        await this.writeFile(this.collection, this.list);
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async update(user: { id: number, name: string, password: string, email: string, roles: number[] }): Promise<void> {
    try {
      this.list = await this.readFile(this.collection);
      const index = this.list.findIndex(item => item.id === user.id);
      this.list[index].email = user.email
      this.list[index].name = user.name
      this.list[index].password = user.password
      await this.writeFile(this.collection, this.list);
      return 
    } catch (error) {
      console.log(error)
      return
    }
  }

  generateId(): number {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const uniqueNumber = timestamp + random;
    return uniqueNumber;
  }

  async getUserByEmail(emailParam: string): Promise<User | undefined> {
    try {
      this.list = await this.readFile(this.collection);

      return this.list.find(function (User) { return User.email === emailParam })


    } catch (error) {
      console.log(error)
      return undefined
    }
  };


}