import { Roleable } from '../../../core/interfaces/repositories/auth/Roleable';
import { NotFoundException } from '../../../core/errors';
import { RoleRequestParams } from '../../../core/types/requestInputs';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
import { Role as RoleDto } from '../../../core/dtos/auth/Role';
import { Role as RoleModel } from '../../database/models/Role';
import { QueryFilter } from '../../../core/types/database';
import { Permission } from '../../database/models/Permission';

export class RolePostgres implements Roleable {
  /**
   * Converts a RoleEntity object into a RoleDto object.
   * @param {RoleEntity} role - The RoleEntity object to be mapped.
   * @returns {RoleDto} - The resulting RoleDto object.
   */

  toEntity(role: RoleModel): RoleEntity {
    return new RoleEntity(role.toJSON())
  }
  /**
   * Retrieves all RoleDto data from the collection.
   * @returns {Promise<RoleDto[]>} - A promise that resolves to an array of RoleDto objects if successful.
   */
  async getAll(): Promise<RoleEntity[]> {
    const roles = await RoleModel.findAll({ include: RoleModel });

    return roles.map((role: RoleModel) => {
      return this.toEntity(role);
    });
  };

  /**
   * Filters roles based on given conditions.
   * @param {QueryFilter[]} conditions - The conditions to filter roles.
   * @returns {Promise<RoleDto[]>} - A promise that resolves to an array of filtered RoleDto objects if successful.
   */
  async filter (whereClauses: QueryFilter): Promise<RoleEntity[]>  {
    const filteredRoles = await RoleModel.findAll({
      where: whereClauses,
      include: RoleModel,
    });

    // Convierte los usuarios filtrados a objetos RoleDto
    return filteredRoles.map((role) => {
      return this.toEntity(role);
    });
  };
  /**
   * Adds a new Role to the collection and return a RoleDto.
   * @param {RoleRequestParams} role - The role object to add.
   * @returns {Promise<RoleDto>} - A promise that resolves to the added role object (as a RoleDto) if successful.
   */
  async create(role: RoleRequestParams): Promise<RoleEntity> {
    const permissions = await Permission.findAll({
      where: {
        id: role.permissions,
      },
    });

    new RoleEntity({
      name: role.name,
      permissions: permissions.map((item) => item.toJSON()),
    });

    const result = await RoleModel.create({
      name: 'Nombre del Nuevo Rol',
      permissions,
    });
    return this.toEntity(result)
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number>{
    const indexRole = await RoleModel.destroy({
      where: {
        id,
      },
    });
    return indexRole;
  };

  /**
   * Updates a role with the specified ID and returns the updated RoleDto.
   * @param {number} id - The ID of the role to update.
   * @param {RoleRequestParams} role - The updated role data.
   * @returns {Promise<RoleDto>} - A promise that resolves to the updated role object if successful, or false if unsuccessful.
   */
  async update (id: number, role: RoleRequestParams): Promise<RoleEntity> {
    const roleDb = await RoleModel.findByPk(id);
    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }
    new RoleEntity(role);

    roleDb.set('name', role.name);

    const permissions = await Permission.findAll({
      where: {
        id: role.permissions,
      },
    });

    roleDb.set('permissions', permissions);

    // Guarda los cambios en la base de datos
    await roleDb.save();

    return this.toEntity(roleDb);
  };

  /**
   * Retrieves a RoleDto by their ID from the collection.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {Promise<RoleDto | false>} - A promise that resolves to the RoleDto object if the role is found, or false if the role is not found.
  
   */
  async getById(id: number): Promise<RoleEntity>{
    const roleDb = await RoleModel.findByPk(id, { include: RoleModel });

    // Si el usuario no se encuentra, devuelve false
    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    return this.toEntity(roleDb);
  };
}
