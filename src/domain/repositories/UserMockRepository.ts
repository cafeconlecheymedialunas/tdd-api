

import { UserRepositoryInterface } from "../interfaces/repositories/UserRepositoryInterface"
import { Role, UserInterface } from "../types/user.types"
import { User } from "../entities/User.entity"
import fs from 'fs';
export class UserMockRepository implements UserRepositoryInterface {
    list: User[]=  [];
    dataFilePath = __dirname+'/data.json'
  

    readUsersFile = async (): Promise<any[]> => {
        try {
          const data = await fs.promises.readFile(this.dataFilePath, 'utf8');
          return JSON.parse(data);
        } catch (error) {
          console.error('Error al leer el archivo de usuarios:', error);
          throw error;
        }
      };
      
    writeUsersFile = async (data: any[]): Promise<void> => {
        try {
          await fs.promises.writeFile(this.dataFilePath, JSON.stringify(data));
        } catch (error) {
          console.error('Error al escribir en el archivo de usuarios:', error);
          throw error;
        }
      };
    getAll = (): User[] => {
        
        return this.list
    };

    getById = (id: number): User => {
        this.list.find((elem) => elem.id === id)
        return this.list[0]
    }

    async add (user: User): Promise<false | User>{
    
        try {
            const id = this.generateId()
            const newUser = new User(
                user.name,
                user.email,
                user.password,
                id
            )
          
            this.list = await this.readUsersFile();

            this.list.push(newUser);
            await this.writeUsersFile(this.list);
            console.log(this.list)
            return newUser
          } catch (error) {
            console.log(error)
            return false
          }
    
    }

    delete = (id: number): void => {
        this.list = this.list.filter(item => item.id !== id);
    }

    update = (id: number, user: UserInterface): void => {
        const index = this.list.findIndex((elem) => elem.id === id);
        if (index !== -1) {
            this.list[index] = user;
        }
    }

    generateId(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const uniqueNumber = timestamp + random;
        return uniqueNumber;
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
          
            this.list = await this.readUsersFile();
           
            const user  = this.list.find(function (elem) {
                return elem.email === email
            })
            return (user !== undefined) ? user : undefined
          } catch (error) {
            console.log(error)
            return undefined
          }
        
     
    };

    async getUserByEmailAndPassword(email: string, passwordHashed: string): Promise<User | undefined> {
        
        try {

            let foundUser = await this.getUserByEmail(email);
            return (foundUser?.password == passwordHashed)?foundUser:undefined
          } catch (error) {
            console.log(error)
            return undefined
          }
        
      
    }


}