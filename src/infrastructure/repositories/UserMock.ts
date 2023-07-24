import { UserMockable } from '../../domain/interfaces/repositories/UserMockable';
import Userable from '../../domain/interfaces/mappers/Userable';
import { UserNotFoundException } from '../../domain/types/errors';
import { User } from '../../domain/entities/User';
import { UserRequestParams } from '../../domain/types/requestParams';
import { Condition, QueryFilter } from '../../domain/types/response';
import { UserDto } from '../../application/dtos/User';
import { Mock } from './Mock';

export class UserMock extends Mock implements UserMockable {
  list: User[] = [];
  collection = 'users';
  dataMapper: Userable;

  constructor(dataMapper: Userable) {
    super();

    this.dataMapper = dataMapper;
  }

  getAll = async (): Promise<UserDto[] | false> => {
    this.list = await this.readFile(this.collection);

    const results = await this.dataMapper.mapList(this.list);

    return results;
  };

  filter = async (conditions: QueryFilter[]): Promise<UserDto[]> => {
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
  };

  add = async (user: UserRequestParams): Promise<UserDto | false> => {
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
  };

  delete = async (id: number): Promise<boolean> => {
    this.list = await this.readFile(this.collection);

    const index = this.list.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.list.splice(index, 1);

      await this.writeFile(this.collection, this.list);

      return true;
    } else {
      return false;
    }
  };

  update = async (id: number, user: UserRequestParams): Promise<UserDto | false> => {
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
  };

  getById = async (id: number): Promise<UserDto | false> => {
    this.list = await this.readFile(this.collection);

    const user = this.list.find((item) => item.id === id);

    if (!user) throw new UserNotFoundException(id);

    const userDto = await this.dataMapper.mapItem(user);

    if (!userDto) return false;

    return userDto;
  };
}
