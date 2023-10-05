import { Userable } from '../../../core/interfaces/repositories/auth/Userable';
import { NotFoundException } from '../../../core/errors';
import { User as UserEntity } from '../../../core/entities/auth/User';
import { UserRequestParams } from '../../../core/types/requestInputs';
import { QueryFilter } from '../../../core/types/database';
import { Name } from '../../../core/entities/auth/Name';
import { Email } from '../../../core/entities/auth/Email';
import { Password } from '../../../core/entities/auth/Password';

import Application from '../../../Application';
export class UserPostgres implements Userable {
  protected models: any;
  constructor() {
    this.models = new Promise((resolve, reject) => {
      Application.getInstance()
        .database()
        .then((result) => {
          return result;
        });
    });
  }
  /**
   * Retrieves all UserDto data from the collection.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects if successful.
   */
  async getAll(): Promise<UserEntity[]> {
    const users = await this.models.user.findAll({ include: this.models.role });

    return users.map((user: any) => {
      return new UserEntity(user.toJSON());
    });
  }



  /**
   * Filters users based on given conditions.
   * @param {QueryFilter} conditions - The conditions to filter users.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of filtered UserDto objects if successful.
   */
  async filter(whereClauses: QueryFilter): Promise<UserEntity[]> {
    const filteredUsers = await this.models.user.findAll({
      where: whereClauses,
      include: this.models.role,
    });

    // Convierte los usuarios filtrados a objetos UserDto
    return filteredUsers.map((user: any) => {
      return this.toEntity(user);
    });
  }
  /**
   * Adds a new User to the collection and return a UserDto.
   * @param {UserRequestParams} user - The user object to add.
   * @returns {Promise<UserDto>} - A promise that resolves to the added user object (as a UserDto) if successful.
   */
  async create(user: UserRequestParams): Promise<UserEntity> {
    const newUser = new UserEntity({
      firstName: new Name(user.firstName),
      lastName: new Name(user.lastName),
      email: new Email(user.email),
      password: new Password(user.password),
      roles: user.roles,
    });

    const roles = await this.models.role.findAll({
      where: {
        id: user.roles,
      },
    });
    const userDb = await this.models.user.create({
      firstName: newUser.getFirstName(),
      lastName: newUser.getLastName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      roles,
    });
    return this.toEntity(userDb);
  }

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number> {
    const indexUser = await this.models.user.destroy({
      where: {
        id,
      },
    });
    return indexUser;
  }

  /**
   * Updates a user with the specified ID and returns the updated UserDto.
   * @param {number} id - The ID of the user to update.
   * @param {UserRequestParams} user - The updated user data.
   * @returns {Promise<UserDto>} - A promise that resolves to the updated user object if successful, or false if unsuccessful.
   */
  async update(id: number, user: UserRequestParams): Promise<UserEntity> {
    const userDb = await this.models.user.findByPk(id);
    if (!userDb) {
      throw new NotFoundException(id, 'User');
    }
  
    this.validate(user)

    userDb.set('firstName', user.firstName);
    userDb.set('lastName', user.lastName);
    userDb.set('email', user.email);
    userDb.set('password', user.password);

    await userDb.save();

    return this.toEntity(userDb);
  }

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
  
   */
  async getById(id: number): Promise<UserEntity> {
    const userDb = await this.models.user.findByPk(id, { include: this.models.role });

    if (!userDb) {
      throw new NotFoundException(id, 'User');
    }

    return this.toEntity(userDb.toJSON());
  }

  toEntity(user: any): UserEntity {
    return new UserEntity({
      firstName: new Name(user.getDataValue('firstName')),
      lastName: new Name(user.getDataValue('lastName')),
      email: new Email(user.getDataValue('email')),
      password: new Password(user.getDataValue('password')),
      roles: user.getDataValue('roles'),
    });
  }

  validate(user:UserRequestParams):void{
    new UserEntity({
      firstName: new Name(user.firstName),
      lastName: new Name(user.lastName),
      email: new Email(user.email),
      password: new Password(user.password),
      roles: user.roles,
    });
  }
}
