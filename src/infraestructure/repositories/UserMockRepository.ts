import { UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface';
import { MockRepository } from './MockRepository';
import { BasicExpression, UserInput } from '../../domain/types/inputsParams';
import { UserDto } from '../../application/dtos/UserDto';
import UserDataMapperInterface from '../../domain/interfaces/datamappers/UserDataMapperInterface';
import { ClientError } from '../utils';
import { User } from '../../domain/entities/User.entity';

export class UserMockRepository extends MockRepository implements UserRepositoryInterface {
  list: User[] = [];
  collection = 'users';
  dataMapper: UserDataMapperInterface;
  constructor(dataMapper: UserDataMapperInterface) {
    super();
    this.dataMapper = dataMapper;
  }

  async getAll(): Promise<UserDto[] | false> {
    this.list = await this.readFile(this.collection);
    const results = await this.dataMapper.mapList(this.list);
    return results;
  }

  async filter(expressions: BasicExpression[]): Promise<UserDto[] | false> {
    this.list = await this.readFile(this.collection);
    if (!this.list) return false;
    const result = this.list.filter((item) =>
      expressions.every((expr: BasicExpression) => this.evaluateExpression(expr, item)),
    );
    const dtos = this.dataMapper.mapList(result);
    return dtos;
  }

  async add(user: UserInput): Promise<UserDto | false> {
    let id = this.generateId();
    this.list = await this.readFile(this.collection);
    id = !id ? this.list?.length : id;
    const newUser = {
      ...user,
      id,
    };
    this.list.push(newUser);
    await this.writeFile(this.collection, this.list);
    const userDto = await this.dataMapper.mapItem(newUser);
    if (!userDto) return false;
    return userDto;
  }
  async delete(id: number): Promise<boolean> {
    this.list = await this.readFile(this.collection);
    const index = this.list.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.list.splice(index, 1);
      await this.writeFile(this.collection, this.list);
      return true;
    } else {
      return false;
    }
  }

  async update(id: number, user: UserInput): Promise<UserDto | false> {
    if (!id) return false;
    this.list = await this.readFile(this.collection);
    const indexUser = this.list.findIndex((item) => item.id === id);
    if (!this.list[indexUser]) return false;
    const updatedUser = {
      ...user,
      id,
    };
    this.list[indexUser] = updatedUser;
    await this.writeFile(this.collection, this.list);
    const userDto = await this.dataMapper.mapItem(updatedUser);
    if (!userDto) return false;
    return userDto;
  }

  async getUserByEmail(emailParam: string): Promise<UserDto> {
    const result = await this.filter([{ key: 'email', operation: 'equal', value: emailParam }]);
    if (!result) throw new ClientError('nO SE PUDO OBTENER', 400);
    return result[0];
  }

  async getById(id: number): Promise<UserDto | false> {
    this.list = await this.readFile(this.collection);
    const user = this.list.find((item) => item.id === id);
    if (!user) throw new ClientError('User does not exist');
    const userDto = await this.dataMapper.mapItem(user);
    if (!userDto) return false;
    return userDto;
  }
}
