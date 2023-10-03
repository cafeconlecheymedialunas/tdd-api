import { NotFoundException } from '../../../core/errors';
import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';
import { PermissionRequestParams } from '../../../core/types/requestInputs';
import { Permission as PermissionDto } from '../../../core/dtos/auth/Permission';
import { QueryFilter } from '../../../core/types/database';
import { Permission as PermissionModel } from '../../database/models/Permission';
import { Role as RoleModel } from '../../database/models/Role';
import { Permissionable } from '../../../core/interfaces/repositories/auth/Permissionable';
import { Method } from '../../../core/entities/auth/Method';
import { Name } from '../../../core/entities/auth/Name';
import { SerialId } from '../../../core/entities/auth/SerialId';

export class PermissionPostgres implements Permissionable {
  

  /**
   * Retrieves all PermissionDto data from the collection.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of PermissionDto objects if successful.
   */
  async getAll(): Promise<PermissionEntity[]>{
    const permissionsDb = await PermissionModel.findAll();

    const permissions = permissionsDb.map((permission) => {
        return this.toEntity(permission.toJSON())
    });

    return permissions;
  };

   /**
   * Filters permissions based on given conditions.
   * @param {QueryFilter[]} conditions - The conditions to filter permissions.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of filtered PermissionDto objects if successful.
   */
   async filter(whereClauses: QueryFilter): Promise<PermissionEntity[]> {
  

    const filteredPermissions = await PermissionModel.findAll({
      where: whereClauses,
      include: RoleModel,
    });

    return filteredPermissions.map((permission) => {
      return this.toEntity(permission);
    });
  };

  toEntity(permission: PermissionModel): PermissionEntity {
    return new PermissionEntity(
      {
        id: new SerialId(permission.getDataValue("id")),
        route: new Name(permission.getDataValue("route")),
        method : new Method(permission.getDataValue("method"))
      }
     
    );
  }
  /**
   * Adds a new Permission to the collection and return a PermissionDto.
   * @param {PermissionRequestParams} permission - The permission object to add.
   * @returns {Promise<PermissionDto>} - A promise that resolves to the added permission object (as a PermissionDto) if successful.
   */
  async create(permission: PermissionRequestParams): Promise<PermissionEntity> {
    const permissionEntity = new PermissionEntity({
      route: new Name(permission.route),
      method: new Method(permission.method)
    });

    const result = await PermissionModel.create({
        route: permissionEntity.getRoute(),
        method : permissionEntity.getMethod()
    });

    


    return  this.toEntity(result);
  };

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number>{
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
  async update (id: number, permission: PermissionRequestParams): Promise<PermissionEntity>{
    const permissionDb = await PermissionModel.findByPk(id);
    if (!permissionDb) {
        throw new NotFoundException(id, 'Permission');
      }
    const permissionEntity = new PermissionEntity({
      route:new Name(permission.route),
      method:new Method(permission.method) 
    }
   
    );

    permissionDb.set('route', permissionEntity.getRoute());
    permissionDb.set('method', permissionEntity.getMethod());

    // Guarda los cambios en la base de datos
    await permissionDb.save();
      
    return this.toEntity(permissionDb);
  };

  /**
   * Retrieves a PermissionDto by their ID from the collection.
   * @param {number} id - The ID of the permission to retrieve.
   * @returns {Promise<PermissionDto | false>} - A promise that resolves to the PermissionDto object if the permission is found, or false if the permission is not found.
  
   */
  async getById(id: number): Promise<PermissionEntity> {
    const permissionDb = await PermissionModel.findByPk(id);

    // Si el usuario no se encuentra, devuelve false
    if (!permissionDb) {
      throw new NotFoundException(id, 'Permission');
    }

   return this.toEntity(permissionDb)
  };
}
