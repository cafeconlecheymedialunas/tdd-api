import { Roleable } from '../../../core/interfaces/repositories/auth/Roleable';
import { NotFoundException } from '../../../core/errors';
import { RoleRequestParams } from '../../../core/types/requestInputs';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
import { QueryFilter } from '../../../core/types/database';
import { Name } from '../../../core/entities/auth/Name';
import { SerialId } from '../../../core/entities/auth/SerialId';
import Application from '../../../Application';

export class RolePostgres implements Roleable {
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
   * Converts a RoleEntity object into a RoleDto object.
   * @param {RoleEntity} role - The RoleEntity object to be mapped.
   * @returns {RoleDto} - The resulting RoleDto object.
   */


  /**
   * Retrieves all RoleDto data from the collection.
   * @returns {Promise<RoleDto[]>} - A promise that resolves to an array of RoleDto objects if successful.
   */
  async getAll(): Promise<RoleEntity[]> {
    const roles = await this.models.role.findAll({ include: this.models.role });

    return roles.map((role: any) => {
      return this.toEntity(role);
    });
  }

  /**
   * Filters roles based on given conditions.
   * @param {QueryFilter[]} conditions - The conditions to filter roles.
   * @returns {Promise<RoleDto[]>} - A promise that resolves to an array of filtered RoleDto objects if successful.
   */
  async filter(whereClauses: QueryFilter): Promise<RoleEntity[]> {
    const filteredRoles = await this.models.role.findAll({
      where: whereClauses,
      include: this.models.permission,
    });

    // Convierte los usuarios filtrados a objetos RoleDto
    return filteredRoles.map((role: any) => {
      return this.toEntity(role);
    });
  }
  /**
   * Adds a new Role to the collection and return a RoleDto.
   * @param {RoleRequestParams} role - The role object to add.
   * @returns {Promise<RoleDto>} - A promise that resolves to the added role object (as a RoleDto) if successful.
   */
  async create(role: RoleRequestParams): Promise<RoleEntity> {

    this.validate(role)

    const permissions = await this.models.permission.findAll({
      where: {
        id: role.permissions,
      },
    });

    const result = await this.models.role.create({
      name: role.name,
      permissions,
    });

    return this.toEntity(result);
  }

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number> {
    const roleDb = await this.models.role.findByPk(id);

    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    const indexRole = await this.models.role.destroy({
      where: {
        id,
      },
    });

    return indexRole;
  }

  /**
   * Updates a role with the specified ID and returns the updated RoleDto.
   * @param {number} id - The ID of the role to update.
   * @param {RoleRequestParams} role - The updated role data.
   * @returns {Promise<RoleDto>} - A promise that resolves to the updated role object if successful, or false if unsuccessful.
   */
  async update(id: number, role: RoleRequestParams): Promise<RoleEntity> {
    const roleDb = await this.models.role.findByPk(id);

    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    this.validate(role)

    roleDb.set('name', role.name);

    const permissions = await this.models.permission.findAll({
      where: {
        id: role.permissions,
      },
    });

    roleDb.set('permissions', permissions);

    await roleDb.save();

    return this.toEntity(roleDb);
  }

  /**
   * Retrieves a RoleDto by their ID from the collection.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {Promise<RoleDto | false>} - A promise that resolves to the RoleDto object if the role is found, or false if the role is not found.
  
   */
  async getById(id: number): Promise<RoleEntity> {
    const roleDb = await this.models.role.findByPk(id, { include: this.models.role });

    // Si el usuario no se encuentra, devuelve false
    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    return this.toEntity(roleDb);
  }

  private toEntity(role: any): RoleEntity {
    return new RoleEntity({
      id: new SerialId(role.getDataValue('id')),
      name: new Name(role.getDataValue('name')),
      permissions: role.getDataValue('permissions'),
    });
  }

  private validate(role:RoleRequestParams):void{
    new RoleEntity({
      name: new Name(role.name),
      permissions: role.permissions
    });
  }
}
