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

  /**
   * Retrieves all UserDto data from the collection.
   * @returns {Promise<UserDto[] | false>} - A promise that resolves to an array of UserDto objects if successful, or false if an error occurs.
   */
  getAll = async (): Promise<UserDto[] | false> => {
    this.list = await this.readFile(this.collection);

    const results = await this.dataMapper.mapList(this.list);

    return results;
  };

  /**
   * Filters the list of users based on the given conditions and returns a promise that resolves to an array of UserDto objects.
   * @param {QueryFilter[]} conditions - An array of query filters to apply to the list of users.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects that match the given conditions.
   */
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

  /**
   * Adds a new User to the collection and return a UserDto.
   * @param {UserRequestParams} user - The user object to add.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the added user object (as a UserDto) if successful, or false if unsuccessful.
   */
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

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
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

  /**
   * Updates a user with the specified ID and returns the updated UserDto.
   * @param {number} id - The ID of the user to update.
   * @param {UserRequestParams} user - The updated user data.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the updated user object if successful, or false if unsuccessful.
   */
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

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
   * @throws {UserNotFoundException} - If the user with the specified ID is not found in the collection.
   */
  getById = async (id: number): Promise<UserDto | false> => {
    this.list = await this.readFile(this.collection);

    const user = this.list.find((item) => item.id === id);

    if (!user) throw new UserNotFoundException(id);

    const userDto = await this.dataMapper.mapItem(user);

    if (!userDto) return false;

    return userDto;
  };
}
