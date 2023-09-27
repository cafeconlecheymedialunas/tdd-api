import { Roleable } from '../../../core/interfaces/repositories/auth/Roleable';
import { NotFoundException } from '../../../core/errors';
import { RoleRequestParams } from '../../../core/types/requestInputs';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
import { Role as RoleDto } from '../../../core/dtos/auth/Role';
import { Role as RoleModel } from 'infra/database/models/Role';
import { QueryFilter } from 'core/types/database';
import { Permission } from 'infra/database/models/Permission';


export class RolePostgres implements Roleable {
  /**
   * Converts a RoleEntity object into a RoleDto object.
   * @param {RoleEntity} role - The RoleEntity object to be mapped.
   * @returns {RoleDto} - The resulting RoleDto object.
   */

  /**
   * Retrieves all RoleDto data from the collection.
   * @returns {Promise<RoleDto[]>} - A promise that resolves to an array of RoleDto objects if successful.
   */
  getAll = async (): Promise<RoleDto[]> => {
    const roles = await RoleModel.findAll({ include: RoleModel });

    const rolesDto = roles.map((role) => {
        return this.toDto(role)
    });

    return rolesDto;
  };

  toDto(role: RoleModel): RoleDto {
    return new RoleDto({
        id: role.getDataValue('id'),
        name: role.getDataValue('name'),
        permissions:role.getDataValue("permissions")
      });
  }

   /**
   * Filters roles based on given conditions.
   * @param {QueryFilter[]} conditions - The conditions to filter roles.
   * @returns {Promise<RoleDto[]>} - A promise that resolves to an array of filtered RoleDto objects if successful.
   */
   filter = async (whereClauses: QueryFilter): Promise<RoleDto[]> => {

    const filteredRoles = await RoleModel.findAll({
      where: whereClauses,
      include: RoleModel,
    });

    // Convierte los usuarios filtrados a objetos RoleDto
    return filteredRoles.map((role) => {
      return this.toDto(role);
    });
  };
  /**
   * Adds a new Role to the collection and return a RoleDto.
   * @param {RoleRequestParams} role - The role object to add.
   * @returns {Promise<RoleDto>} - A promise that resolves to the added role object (as a RoleDto) if successful.
   */
  create = async (role: RoleRequestParams): Promise<RoleDto> => {
    const newRole = new RoleEntity({
      name: role.name
    });

    const permissions = await Permission.findAll({
      where: {
        id: role.permissions, 
      }
    });
  
    const result = await RoleModel.create(
      {
        name: 'Nombre del Nuevo Rol',
        permissions
      }
    );




    return this.toDto(result);
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  delete = async (id: number): Promise<number> => {
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
  update = async (id: number, role: RoleRequestParams): Promise<RoleDto> => {
    const roleDb = await RoleModel.findByPk(id);
    if (!roleDb) {
        throw new NotFoundException(id, 'Role');
      }
    const roleEntity = new RoleEntity(role);

    roleDb.set('name', role.name);

    const permissions = await Permission.findAll({
      where: {
        id: role.permissions, 
      }
    });

    roleDb.set('permissions', permissions);

    // Guarda los cambios en la base de datos
    await roleDb.save();

    // Convierte el usuario actualizado a un objeto RoleDto y lo devuelve
      
    return this.toDto(roleDb);
  };

  /**
   * Retrieves a RoleDto by their ID from the collection.
   * @param {number} id - The ID of the role to retrieve.
   * @returns {Promise<RoleDto | false>} - A promise that resolves to the RoleDto object if the role is found, or false if the role is not found.
  
   */
  getById = async (id: number): Promise<RoleDto> => {
    const roleDb = await RoleModel.findByPk(id, { include: RoleModel });

    // Si el usuario no se encuentra, devuelve false
    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

   return this.toDto(roleDb)
  };
}
