import { UserRepositoryInterface } from "../../domain/interfaces/repositories/UserRepositoryInterface"
import { BasicExpression, MockRepository } from "./MockRepository";
import { UserDto } from "../../application/dtos/UserDto";
import { UserDtoMapper } from "../../application/dataMappers/UserDtoMapper";
import { RoleMockRepository } from "./RoleMockRepository";
import UserDataMapperInterface from "../../domain/interfaces/datamappers/UserDataMapperInterface";
import { Role } from "../../domain/entities/Role.entity";
import { ClientError } from "../utils";

export class UserMockRepository extends MockRepository implements UserRepositoryInterface {
  list: UserDto[] = [];
  collection = 'users'
  dataMapper: UserDataMapperInterface
  constructor() {
    super()
    this.dataMapper = new UserDtoMapper(new RoleMockRepository())
  }
  async getAll(): Promise<UserDto[]> {
    try {
      this.list = await this.readFile(this.collection);
      const result = await Promise.all(
        this.list.map(async (item) => {
          const roles = [...new Set(item.roles.map((role: Role) => role.id))];
          return await this.dataMapper.map(item.id, item.name, item.email, item.password, roles)
        })
      )

      if (result) throw new ClientError('nO SE PUDO OBTENER', 400)

      this.list = result
      this.writeFile(this.collection, this.list)
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
  async add(user: { name: string, password: string, email: string, roles: number[] }): Promise<UserDto> {

    const { name, password, email, roles } = user
    const id = this.generateId()
    this.list = await this.readFile(this.collection);
    const userDto = await this.dataMapper.map(id, name, email, password, roles)
    if (!userDto) throw new ClientError('nO SE PUDO OBTENER', 400)
    this.list.push(userDto);
    await this.writeFile(this.collection, this.list);
    return userDto

  }
  async delete(id: number): Promise<boolean> {

    this.list = await this.readFile(this.collection);
    const index = this.list.findIndex(item => item.id === id);
    if (index !== -1) {
      this.list.splice(index, 1);
      await this.writeFile(this.collection, this.list);
      return true
    } else {
      return false
    }

  }

  async update(user: { id: number, name: string, password: string, email: string, roles: number[] }): Promise<UserDto> {

    this.list = await this.readFile(this.collection);
    const index = this.list.findIndex(item => item.id === user.id);
    if (!index) throw new ClientError('nO SE PUDO OBTENER', 400)
    const result = await this.dataMapper.map(index, user.name, user.email, user.password, user.roles)
    if (!result) throw new ClientError('nO SE PUDO OBTENER', 400)

    this.list[index] = result
    await this.writeFile(this.collection, this.list);
    if (!this.list[index]) throw new ClientError('nO SE PUDO OBTENER', 400)
    return this.list[index]

  }

  async getUserByEmail(emailParam: string): Promise<UserDto> {

    const result = await this.filter([{ key: 'email', operation: 'equal', value: emailParam }])
    if (!result) throw new ClientError('nO SE PUDO OBTENER', 400)
    return result[0]

  }
}