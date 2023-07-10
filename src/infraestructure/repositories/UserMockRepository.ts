import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface"
import { User } from "../../domain/entities/User.entity"
import { BasicExpression, MockRepository } from "./MockRepository";
import { UserDto } from "../../application/dtos/UserDto";
import { UserDtoMapper } from "../../application/datamappers/UserDtoMapper";
import { RoleMockRepository } from "./RoleMockRepository";
import UserDataMapperInterface from "../../domain/interfaces/datamappers/UserDataMapperInterface";

export class UserMockRepository extends MockRepository implements UserRepositoryInterface {
  list: UserDto[] = [];
  collection = 'users'
  dataMapper: UserDataMapperInterface
  constructor() {
    super()
    this.dataMapper = new UserDtoMapper(new RoleMockRepository())
  }
  async getAll(): Promise<User[]> {
    try {
      this.list = await this.readFile(this.collection);
      return this.list
    } catch (error) {
      return []
    }
  }

  async filter(expressions: BasicExpression[]): Promise<UserDto[] | false> {
    this.list = await this.readFile(this.collection);
    if (!this.list) return false
    const result = this.list.filter(item => expressions.every((expr: BasicExpression) => this.evaluateExpression(expr, item)))
    return result
  }
  async add(user: { name: string, password: string, email: string, roles: number[] }): Promise<false | UserDto> {
    try {
      const { name, password, email, roles } = user
      const id = this.generateId()
      this.list = await this.readFile(this.collection);
      const userDto = await this.dataMapper.map(id, name, email, password, roles)
      if (!userDto) return false
      this.list.push(userDto);
      await this.writeFile(this.collection, this.list);
      return userDto
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

  async update(user: { id: number, name: string, password: string, email: string, roles: number[] }): Promise<UserDto | false> {
    try {
      this.list = await this.readFile(this.collection);
      const index = this.list.findIndex(item => item.id === user.id);
      if (!index) return false
      const result = await this.dataMapper.map(index, user.name, user.email, user.password, user.roles)
      if (!result) return false

      this.list[index] = result
      await this.writeFile(this.collection, this.list);

      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getUserByEmail(emailParam: string): Promise<UserDto | undefined> {
    try {

      const result = await this.filter([{ key: 'email', operation: 'equal', value: emailParam }])
      if (!result) return undefined
      return result[0]
    } catch (error) {
      console.log(error)
      return undefined
    }
  }
}