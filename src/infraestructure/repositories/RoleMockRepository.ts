import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface"
import { UserInterface } from "../../domain/types/user.types"
import { User } from "../../domain/entities/User.entity"
import fs from 'fs';
import { Role } from "../../domain/entities/Role.entity";
import { rolesDefaults } from "../../domain/types/roles.types";
import { UserDto } from "../../application/dtos/UserDto";
import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface";
export class RoleMockRepository implements RoleRepositoryInterface {
  list: User[] = [];
  dataFilePath = __dirname + '/data.json'

 

  async getById(id: number): Promise<User | undefined> {
    try {
      this.list = await this.readUsersFile();
      const user = this.list.find(function (elem) {
        return elem.id === id
      })
      return (user !== undefined) ? user : undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async add(user: UserInterface): Promise<false | User> {
    try {
      const id = this.generateId()
      const selectedRoles: Role[] = this.selectRoles(user.roles)

      const newUser = new UserDto(
        user.name,
        user.email,
        user.password,
        id,
        selectedRoles
      )
      this.list = await this.readUsersFile();
      this.list.push(newUser);
      await this.writeUsersFile(this.list);
      return newUser
    } catch (error) {
      return false
    }
  }

  
  generateId(): number {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const uniqueNumber = timestamp + random;
    return uniqueNumber;
  }

 
}