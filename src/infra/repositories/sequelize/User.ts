import { Userable } from '../../../core/interfaces/repositories/auth/Userable';
import { NotFoundException } from '../../../core/errors';
import { User as UserEntity } from '../../../core/entities/auth/User';
import { UserRequestParams } from '../../../core/types/requestInputs';
import { User as UserDto } from '../../../core/dtos/auth/User';
import { QueryFilter } from 'core/types/database';
import { User as UserModel } from 'infra/database/models/User';
import { Role as RoleModel } from 'infra/database/models/Role';

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
  getAll = async (): Promise<UserDto[]> => {
    const users = await UserModel.findAll({ include: RoleModel });

    const usersDto = users.map((user) => {
        return this.toDto(user)
    });

    return usersDto;
  };

  toDto(user: UserModel): UserDto {
    return new UserDto({
        id: user.getDataValue('id'),
        firstName: user.getDataValue('firstName'),
        lastName: user.getDataValue('lastName'),
        email: user.getDataValue('email'),
        password: user.getDataValue('password'),
        roles: user.getDataValue('roles'),
      });
  }

   /**
   * Filters users based on given conditions.
   * @param {QueryFilter} conditions - The conditions to filter users.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of filtered UserDto objects if successful.
   */
   filter = async (whereClauses: QueryFilter): Promise<UserDto[]> => {

    const filteredUsers = await UserModel.findAll({
      where: whereClauses,
      include: RoleModel,
    });

    // Convierte los usuarios filtrados a objetos UserDto
    return filteredUsers.map((user) => {
      return this.toDto(user);
    });
  };
  /**
   * Adds a new User to the collection and return a UserDto.
   * @param {UserRequestParams} user - The user object to add.
   * @returns {Promise<UserDto>} - A promise that resolves to the added user object (as a UserDto) if successful.
   */
  create = async (user: UserRequestParams): Promise<UserDto> => {
    const newUser = new UserEntity({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });

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
        roles:roles
    });

    
   
   


    return this.toDto(userDb);
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  delete = async (id: number): Promise<number> => {
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
  update = async (id: number, user: UserRequestParams): Promise<UserDto> => {
    const userDb = await UserModel.findByPk(id);
    if (!userDb) {
        throw new NotFoundException(id, 'User');
      }
    const userEntity = new UserEntity(user);

    userDb.set('firstName', userEntity.getFirstName());
    userDb.set('lastName', userEntity.getLastName());
    userDb.set('email', userEntity.getEmail());
    userDb.set('password', userEntity.getPassword());

    // Guarda los cambios en la base de datos
    await userDb.save();

    // Convierte el usuario actualizado a un objeto UserDto y lo devuelve
      
    return this.toDto(userDb);
  };

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
  
   */
  getById = async (id: number): Promise<UserDto> => {
    const userDb = await UserModel.findByPk(id, { include: RoleModel });

    // Si el usuario no se encuentra, devuelve false
    if (!userDb) {
      throw new NotFoundException(id, 'User');
    }

   return this.toDto(userDb)
  };
}
