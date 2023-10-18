import { Userable } from '../../../core/interfaces/repositories/auth/Userable';
import { NotFoundException } from '../../../core/errors';
import { User as UserEntity } from '../../../core/entities/auth/User';
import { UserRequestParams } from '../../../core/types/requestInputs';
import { QueryFilter } from '../../../core/types/database';
import { Name } from '../../../core/entities/auth/Name';
import { Email } from '../../../core/entities/auth/Email';
import { Password } from '../../../core/entities/auth/Password';

import Application from '../../../Application';
import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
export class User implements Userable {
  protected userModel: any;
  protected roleModel: any;
  constructor() {
    const models = Application.getInstance().getModels()
    this.userModel = models.users
    this.roleModel = models.roles
  }
  /**
   * Retrieves all UserDto data from the collection.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of UserDto objects if successful.
   */
  async getAll(): Promise<UserEntity[]> {
    const users = await this.userModel.findAll({
      include: [
        {
          model: this.roleModel,
          as: 'role_id_roles_user_roles'
        },
      ]
    });

    return users.map(async (user: any) => {
      return await this.toEntity(user);
    });
  }

  /**
   * Filters users based on given conditions.
   * @param {QueryFilter} conditions - The conditions to filter users.
   * @returns {Promise<UserDto[]>} - A promise that resolves to an array of filtered UserDto objects if successful.
   */
  async filter(whereClauses: QueryFilter): Promise<UserEntity[]> {
    const filteredUsers = await this.userModel.findAll({
      where: whereClauses,
      include: [
        {
          model: this.roleModel,
          as: 'role_id_roles_user_roles'
        },
      ]
    });

    // Convierte los usuarios filtrados a objetos UserDto
    return filteredUsers.map(async (user: any) => {
      return await this.toEntity(user);
    });
  }
  /**
   * Adds a new User to the collection and return a UserDto.
   * @param {UserRequestParams} user - The user object to add.
   * @returns {Promise<UserDto>} - A promise that resolves to the added user object (as a UserDto) if successful.
   */
  async create(user: UserRequestParams): Promise<UserEntity> {



    const roleDb = await this.userModel.create({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      roles: user.roles
    });



    // Asocia los permisos al rol
    if (user.roles && user.roles.length > 0) {
      const selectedRoles = await this.roleModel.findAll({
        where: {
          id: user.roles,
        },
      });

      await roleDb.addRole_id_roles_user_roles(selectedRoles)
      await roleDb.save()



    }


    return await this.toEntity(roleDb)
  }

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number> {
    const indexUser = await this.userModel.destroy({
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
    const userDb = await this.userModel.findByPk(id);
    if (!userDb) {
      throw new NotFoundException(id, 'User');
    }

    userDb.set('firstname', user.firstname);
    userDb.set('lastname', user.lastname);
    userDb.set('email', user.email);
    userDb.set('password', user.password);

    await userDb.save();

    return await this.toEntity(userDb);
  }

  /**
   * Retrieves a UserDto by their ID from the collection.
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<UserDto | false>} - A promise that resolves to the UserDto object if the user is found, or false if the user is not found.
  
   */
  async getById(id: number): Promise<UserEntity> {
    const userDb = await this.userModel.findByPk(id, {
      include: [
        {
          model: this.roleModel,
          as: 'role_id_roles_user_roles'
        },
      ]
    });

    if (!userDb) {
      throw new NotFoundException(id, 'User');
    }

    return await this.toEntity(userDb);
  }

  async userExist(email: string): Promise<boolean> {
    const userDb = await this.userModel.findOne({ where: { email: email } });
    if (userDb) {
      return true
    }
    return false
  }

  async toEntity(user: any): Promise<UserEntity> {
    console.log(await user.getUser_roles())

    const roleEntitys = await Promise.all(
      user.getUser_roles().map(async (role: any) => {

        console.log(role)
        const permissionEntities = role.permission_id_permissions.map((permission: any) => {
          return new PermissionEntity({
            id: permission.id,
            route: permission.route,
            method: permission.id
          })
        })
        return new RoleEntity({
          id: role.id,
          name: role.name,
          permissions: permissionEntities
        })
      })
    )

    return new UserEntity({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      roles: roleEntitys,
    });
  }
}
