import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface"
import { User } from "../../domain/entities/User.entity"
import fs from 'fs';
import { Role } from "../../domain/entities/Role.entity";
import { UserDto } from "../../application/dtos/UserDto";
import { Permission } from "../../domain/entities/Permission.entity";
export class UserMockRepository implements UserRepositoryInterface {
  list: User[] = [];
  dataFilePath = __dirname + '/data.json'
  id: number = 0


 
  async getAll(): Promise<User[]> {
    try {
      this.list = await this.readUsersFile();
      return this.list
    } catch (error) {

      return []
    }
  };

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

  async add(user: {id:number,name:string,password:string,email:string,roles:number[]}): Promise<false | User> {
    try {
      const id = this.generateId()


      const newUser = new UserDto(
        user.name,
        user.email,
        user.password,
        id,
        this.getRoles(user.roles),
        this.getPermissions(user.roles)
      )
      
      return newUser
    } catch (error) {
      return false
    }
  }

  async getRoles(roles:number[]):Role[] {
    this.list = await this.readUsersFile();
    this.list.push(newUser);
    await this.writeUsersFile(this.list);
  }
  async getPermissions(roles:number[]):Permission[] {
    this.list = await this.readUsersFile();
    this.list.push(newUser);
    await this.writeUsersFile(this.list);
  }

  async delete(id: number): Promise<boolean> {
    try {
      const list = await this.readUsersFile();
      const index = list.findIndex(item => item.id === id);
      if (index !== -1) {
        list.splice(index, 1);
        await this.writeUsersFile(list);
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async update(id: number, user: UserInterface): Promise<void> {
    try {
      this.list = await this.readUsersFile();
      const index = this.list.findIndex(item => item.id === id);
      this.list[index].email = user.email
      this.list[index].name = user.name
      this.list[index].password = user.password
      await this.writeUsersFile(this.list);
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
      this.list = await this.readUsersFile();

      return this.list.find(function (User) { return User.email === emailParam })


    } catch (error) {
      console.log(error)
      return undefined
    }
  };

  async readUsersFile(): Promise<any[]> {
    try {
      const data = await fs.promises.readFile(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo de usuarios:', error);
      throw error;
    }
  };

  async writeUsersFile(data: any[]): Promise<void> {
    try {
      await fs.promises.writeFile(this.dataFilePath, JSON.stringify(data));
    } catch (error) {
      console.error('Error al escribir en el archivo de usuarios:', error);
      throw error;
    }
  };
}