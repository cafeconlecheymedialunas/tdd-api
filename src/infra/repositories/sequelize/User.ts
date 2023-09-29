import { Userable } from '../../../core/interfaces/repositories/auth/Userable';
import { NotFoundException } from '../../../core/errors';
import { User as UserEntity } from '../../../core/entities/auth/User';
import { UserRequestParams } from '../../../core/types/requestInputs';
import { User as UserDto } from '../../../core/dtos/auth/User';
import { QueryFilter } from '../../../core/types/database';
import { User as UserModel } from '../../database/models/User';
import { Role as RoleModel } from '../../database/models/Role';

export class UserPostgres implements Userable {
  /**
   * Converts a UserEntity object into a UserDto object.
   * @param {UserEntity} user - The UserEntity object to be mapped.
   * @returns {UserDto} - The resulting UserDto object.
   */

  /**
   * Retrieves all UserDto data from the collection.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects if successful.
   */
  async getAll(): Promise<UserEntity[]> {
    const users = await UserModel.findAll({ include: RoleModel });

    return  users.map((user) => {
        return new UserEntity(user.toJSON())
    });
  };

  toEntity(user: UserModel): UserEntity {
    return new UserEntity(user.toJSON())
  }


   /**
   * Filters users based on given conditions.
   * @param {QueryFilter} conditions - The conditions to filter users.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of filtered UserDto objects if successful.
   */
   async filter(whereClauses: QueryFilter): Promise<UserEntity[]>{

    const filteredUsers = await UserModel.findAll({
      where: whereClauses,
      include: RoleModel,
    });

    // Convierte los usuarios filtrados a objetos UserDto
    return filteredUsers.map((user) => {
      return this.toEntity(user);
    });
  };
  /**
   * Adds a new User to the collection and return a UserDto.
   * @param {UserRequestParams} user - The user object to add.
   * @returns {Promise<UserDto>} - A promise that resolves to the added user object (as a UserDto) if successful.
   */
  async create (user: UserRequestParams): Promise<UserEntity>{
    const newUser = new UserEntity(user);

    const roles = await RoleModel.findAll({
      where: {
        id: user.roles, 
      }
    });
    const userDb = await UserModel.create({
        firstName: newUser.getFirstName(),
        lastName : newUser.getLastName(),
        email:newUser.getEmail(),
        password:newUser.getPassword(),
        roles
    });
    return this.toEntity(userDb);
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number> {
    const indexUser = await UserModel.destroy({
      where: {
        id,
      },
    });
    return indexUser;
  };

  /**
   * Updates a user with the specified ID and returns the updated UserDto.
   * @param {number} id - The ID of the user to update.
   * @param {UserRequestParams} user - The updated user data.
   * @returns {Promise<UserDto>} - A promise that resolves to the updated user object if successful, or false if unsuccessful.
   */
  async update(id: number, user: UserRequestParams): Promise<UserEntity> {
    const userDb = await UserModel.findByPk(id);
    if (!userDb) {
        throw new NotFoundException(id, 'User');
      }
    const userEntity = new UserEntity(user);

    userDb.set('firstName', userEntity.getFirstName());
    userDb.set('lastName', userEntity.getLastName());
    userDb.set('email', userEntity.getEmail());
    userDb.set('password', userEntity.getPassword());

    await userDb.save();
      
    return this.toEntity(userDb);
  };

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
  
   */
  async getById(id: number): Promise<UserEntity>  {
    const userDb = await UserModel.findByPk(id, { include: RoleModel });

    if (!userDb) {
      throw new NotFoundException(id, 'User');
    }

   return this.toEntity(userDb.toJSON())
  };
}
