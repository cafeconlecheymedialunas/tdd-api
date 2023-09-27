import { NotFoundException } from '../../../core/errors';
import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';
import { PermissionRequestParams } from '../../../core/types/requestInputs';
import { Permission as PermissionDto } from '../../../core/dtos/auth/Permission';
import { QueryFilter } from 'core/types/database';
import { Permission as PermissionModel } from 'infra/database/models/Permission';
import { Role as RoleModel } from 'infra/database/models/Role';
import { Permissionable } from 'core/interfaces/repositories/auth/Permissionable';

export class PermissionPostgres implements Permissionable {
  

  /**
   * Retrieves all PermissionDto data from the collection.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of PermissionDto objects if successful.
   */
  getAll = async (): Promise<PermissionDto[]> => {
    const permissions = await PermissionModel.findAll();

    const permissionsDto = permissions.map((permission) => {
        return this.toDto(permission)
    });

    return permissionsDto;
  };

  /**
   * Converts a PermissionModel Sequelize object into a PermissionDto object.
   * @param {PermissionEntity} permission - The PermissionEntity object to be mapped.
   * @returns {PermissionDto} - The resulting PermissionDto object.
   */
  toDto(permission: PermissionModel): PermissionDto {
    return new PermissionDto({
        id: permission.getDataValue('id'),
        route: permission.getDataValue('route'),
        method: permission.getDataValue('method'),
      });
  }

   /**
   * Filters permissions based on given conditions.
   * @param {QueryFilter[]} conditions - The conditions to filter permissions.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of filtered PermissionDto objects if successful.
   */
   filter = async (conditions: QueryFilter): Promise<PermissionDto[]> => {
    // Construye una consulta Sequelize basada en las condiciones proporcionadas
    const whereClause = {}; // Aquí construye tu lógica para convertir condiciones a un objeto where Sequelize

    const filteredPermissions = await PermissionModel.findAll({
      where: whereClause,
      include: RoleModel,
    });

    // Convierte los usuarios filtrados a objetos PermissionDto
    return filteredPermissions.map((permission) => {
      return this.toDto(permission);
    });
  };
  /**
   * Adds a new Permission to the collection and return a PermissionDto.
   * @param {PermissionRequestParams} permission - The permission object to add.
   * @returns {Promise<PermissionDto>} - A promise that resolves to the added permission object (as a PermissionDto) if successful.
   */
  create = async (permission: PermissionRequestParams): Promise<PermissionDto> => {
    const newPermission = new PermissionEntity({
      route: permission.route,
      method: permission.method
    });

    const result = await PermissionModel.create({
        route: newPermission.getRoute(),
        method : newPermission.getMethod()
    });

    


    return this.toDto(result);
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  delete = async (id: number): Promise<number> => {
    const indexPermission = await PermissionModel.destroy({
      where: {
        id,
      },
    });
    return indexPermission;
  };

  /**
   * Updates a permission with the specified ID and returns the updated PermissionDto.
   * @param {number} id - The ID of the permission to update.
   * @param {PermissionRequestParams} permission - The updated permission data.
   * @returns {Promise<PermissionDto>} - A promise that resolves to the updated permission object if successful, or false if unsuccessful.
   */
  update = async (id: number, permission: PermissionRequestParams): Promise<PermissionDto> => {
    const permissionDb = await PermissionModel.findByPk(id);
    if (!permissionDb) {
        throw new NotFoundException(id, 'Permission');
      }
    const permissionEntity = new PermissionEntity(permission);

    permissionDb.set('route', permissionEntity.getRoute());
    permissionDb.set('method', permissionEntity.getMethod());

    // Guarda los cambios en la base de datos
    await permissionDb.save();

    // Convierte el usuario actualizado a un objeto PermissionDto y lo devuelve
      
    return this.toDto(permissionDb);
  };

  /**
   * Retrieves a PermissionDto by their ID from the collection.
   * @param {number} id - The ID of the permission to retrieve.
   * @returns {Promise<PermissionDto | false>} - A promise that resolves to the PermissionDto object if the permission is found, or false if the permission is not found.
  
   */
  getById = async (id: number): Promise<PermissionDto> => {
    const permissionDb = await PermissionModel.findByPk(id);

    // Si el usuario no se encuentra, devuelve false
    if (!permissionDb) {
      throw new NotFoundException(id, 'Permission');
    }

   return this.toDto(permissionDb)
  };
}
