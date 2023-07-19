import { UserRepositoryInterface } from '../../domain/interfaces/repositories/UserRepositoryInterface';
import UserDataMapperInterface from '../../domain/interfaces/datamappers/UserDataMapperInterface';
import { UserNotFoundException } from '../../domain/types/errors';
import { User } from '../../domain/entities/User';
import { Condition, QueryFilter, UserRequestParams } from '../../domain/types/requestParams';
import { UserDto } from '../../application/dtos/UserDto';
import { MockRepository } from './MockRepository';

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

  async filter(conditions: QueryFilter[]): Promise<UserDto[]> {
    await this.getAll();
    const users = this.list.filter((item: User) =>
      conditions.every((condition) => {
        const { key, condition: conditionType, value } = condition;

        const propValue = item[key];

        switch (conditionType) {
          case Condition.Equal:
            return propValue === value;
          case Condition.NotEqual:
            return propValue !== value;
          case Condition.GreaterThan:
            return propValue > value;
          case Condition.LessThan:
            return propValue < value;
          default:
            return true;
        }
      }),
    );

    const dtos = await this.dataMapper.mapList(users);

    if (dtos === false) return [];
    return dtos;
  }

  async add(user: UserRequestParams): Promise<UserDto | false> {
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

  async update(id: number, user: UserRequestParams): Promise<UserDto | false> {
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

  async getById(id: number): Promise<UserDto | false> {
    this.list = await this.readFile(this.collection);

    const user = this.list.find((item) => item.id === id);

    if (!user) throw new UserNotFoundException(id);

    const userDto = await this.dataMapper.mapItem(user);

    if (!userDto) return false;

    return userDto;
  }
}
