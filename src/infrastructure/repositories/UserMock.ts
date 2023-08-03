import { UserMockable } from '../../domain/interfaces/repositories/UserMockable';
import Userable from '../../domain/interfaces/mappers/Userable';
import { NotFoundException } from '../../domain/types/errors';
import { User as UserEntity } from '../../domain/entities/User';
import { UserRequestParams } from '../../domain/types/requestInputs';
import { Condition, QueryFilter } from '../../domain/types/requestInputs';
import { User as UserDto } from '../../application/dtos/User';
import { Mockable } from '../../domain/interfaces/repositories/Mockable';

export class UserMock implements UserMockable {
  list: UserEntity[] = [];
  collection = 'users';
  private readonly userDataMapper: Userable;
  private readonly mockRepository: Mockable<UserEntity>;

  constructor(userDataMapper: Userable, mockRepository: Mockable<UserEntity>) {
    this.userDataMapper = userDataMapper;
    this.mockRepository = mockRepository;
  }

  /**
   * Retrieves all UserDto data from the collection.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects if successful.
   */
  getAll = async (): Promise<UserDto[]> => {
    this.list = await this.mockRepository.readFile(this.collection);

    const results = this.userDataMapper.mapList(this.list);

    return results;
  };

  /**
   * Filters the list of users based on the given conditions and returns a promise that resolves to an array of UserDto objects.
   * @param {QueryFilter[]} conditions - An array of query filters to apply to the list of users.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects that match the given conditions.
   */
  filter = async (conditions: QueryFilter[]): Promise<UserDto[]> => {
    await this.getAll();
    const users = this.list.filter((item: UserEntity) =>
      conditions.every((condition) => {
        const { key, condition: conditionType, value } = condition;

        const propValue = item[key as keyof typeof item];

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

    const dtos = this.userDataMapper.mapList(users);

    return dtos;
  };

  /**
   * Adds a new User to the collection and return a UserDto.
   * @param {UserRequestParams} user - The user object to add.
   * @returns {Promise<UserDto>} - A promise that resolves to the added user object (as a UserDto) if successful.
   */
  add = async (user: UserRequestParams): Promise<UserDto> => {
    const id = this.mockRepository.generateId(this.list);

    this.list = await this.mockRepository.readFile(this.collection);

    const newUser = {
      ...user,
      id,
    };

    this.list.push(newUser);

    await this.mockRepository.writeFile(this.collection, this.list);

    const userDto = this.userDataMapper.mapItem(newUser);

    return userDto;
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  delete = async (id: number): Promise<number> => {
    const indexUser = await this.getUserIndex(id);

    this.list.splice(indexUser, 1);

    await this.mockRepository.writeFile(this.collection, this.list);

    return indexUser;
  };

  /**
   * Updates a user with the specified ID and returns the updated UserDto.
   * @param {number} id - The ID of the user to update.
   * @param {UserRequestParams} user - The updated user data.
   * @returns {Promise<UserDto>} - A promise that resolves to the updated user object if successful, or false if unsuccessful.
   */
  update = async (id: number, user: UserRequestParams): Promise<UserDto> => {
    const indexUser = await this.getUserIndex(id);

    const updatedUser = {
      ...user,
      id,
    };

    this.list[indexUser] = updatedUser;

    await this.mockRepository.writeFile(this.collection, this.list);

    const userDto = this.userDataMapper.mapItem(updatedUser);

    return userDto;
  };

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
  
   */
  getById = async (id: number): Promise<UserDto> => {
    const indexUser = await this.getUserIndex(id);

    const userDto = this.userDataMapper.mapItem(this.list[indexUser]);

    return userDto;
  };

  /**
   * Retrieves the index of a user with the specified ID from the list of users.
   * @param {number} id - The ID of the user to find.
   * @returns {Promise<number>} - A promise that resolves to the index of the user in the list.
   * @throws {NotFoundException} - If no user with the specified ID is found.
   */
  getUserIndex = async (id: number): Promise<number> => {
    this.list = await this.mockRepository.readFile(this.collection);

    const indexUser = this.list.findIndex((item) => item.id === id);

    if (indexUser === -1) throw new NotFoundException(id, 'User');

    return indexUser;
  };
}
