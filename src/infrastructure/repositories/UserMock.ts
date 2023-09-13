import { Userable } from '../../domain/interfaces/repositories/Userable';
import { NotFoundException } from '../../domain/types/errors';
import { User, User as UserEntity } from '../../domain/entities/User';
import { UserRequestParams } from '../../domain/types/requestInputs';
import { Condition, QueryFilter } from '../../domain/types/requestInputs';
import { User as UserDto } from '../../application/dtos/User';
import { Mockable } from '../../domain/interfaces/repositories/Mockable';
import { Role as RoleDto } from 'src/application/dtos/Role';
import { Roleable } from 'src/domain/interfaces/repositories/Roleable';

export class UserMock implements Userable {
  list: UserEntity[] = [];
  collection = 'users';
  private readonly mockRepository: Mockable<UserEntity>;
  private readonly roleMockRepository: Roleable;

  constructor(mockRepository: Mockable<UserEntity>, roleMockRepository: Roleable) {
    this.mockRepository = mockRepository;
    this.roleMockRepository = roleMockRepository;
  }
  /**
   * Get roles from an array of role IDs.
   * @param {number[]} roles - Array of role IDs.
   * @returns {RoleDto[]} - Array of RoleDto objects.
   */
  getRoles = (roles: number[]): RoleDto[] => {
    const selectedRoles = this.roleMockRepository.getByIdList(roles);

    return selectedRoles;
  };

  /**
   * Converts a UserEntity object into a UserDto object.
   * @param {UserEntity} user - The UserEntity object to be mapped.
   * @returns {UserDto} - The resulting UserDto object.
   */
  toDto = (user: UserEntity): UserDto => {
    const selectedRoles = this.getRoles(user.roles);
    const userDto = new UserDto({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roles: selectedRoles,
    });
    return userDto;
  };

  /**
   * Converts a list of UserEntity objects into a list of UserDto objects.
   * @param {UserEntity[]} users - The list of UserEntity objects to be mapped.
   * @returns {UserDto[]} - The resulting list of UserDto objects.
   */
  dtoList = (users: UserEntity[]): UserDto[] => {
    const results = users.map((item: UserEntity) => this.toDto(item));

    return results;
  };

  /**
   * Retrieves all UserDto data from the collection.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects if successful.
   */
  getAll = async (): Promise<UserDto[]> => {
    this.list = await this.mockRepository.readFile(this.collection);

    const results = this.dtoList(this.list);

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

    const dtos = this.dtoList(users);

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

    const newUser = new User({
      ...user,
      id,
    });

    this.list.push(newUser);

    await this.mockRepository.writeFile(this.collection, this.list);

    const userDto = this.toDto(newUser);

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

    const updatedUser = this.list[indexUser];

    this.list[indexUser].name = user.name;
    this.list[indexUser].email = user.email;

    await this.mockRepository.writeFile(this.collection, this.list);

    const userDto = this.toDto(updatedUser);

    return userDto;
  };

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
  
   */
  getById = async (id: number): Promise<UserDto> => {
    const indexUser = await this.getUserIndex(id);

    const userDto = this.toDto(this.list[indexUser]);

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
