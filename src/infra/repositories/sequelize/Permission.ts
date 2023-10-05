import { NotFoundException } from '../../../core/errors';
import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';
import { PermissionRequestParams } from '../../../core/types/requestInputs';
import { QueryFilter } from '../../../core/types/database';
import { Permissionable } from '../../../core/interfaces/repositories/auth/Permissionable';
import { Method } from '../../../core/entities/auth/Method';
import { Name } from '../../../core/entities/auth/Name';
import { SerialId } from '../../../core/entities/auth/SerialId';
import ClientDatabase from 'infra/database/ClientDatabase';
import Application from '../../../Application';

export class PermissionPostgres implements Permissionable {
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
   * Retrieves all PermissionDto data from the collection.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of PermissionDto objects if successful.
   */
  async getAll(): Promise<PermissionEntity[]> {
    const permissionsDb = await this.models.permission.getAll();

    const permissions = permissionsDb.map((permission: any) => {
      return this.toEntity(permission.toJSON());
    });

    return permissions;
  }

  /**
   * Filters permissions based on given conditions.
   * @param {QueryFilter[]} conditions - The conditions to filter permissions.
   * @returns {Promise<PermissionDto[]>} - A promise that resolves to an array of filtered PermissionDto objects if successful.
   */
  async filter(whereClauses: QueryFilter): Promise<PermissionEntity[]> {
    const filteredPermissions = await this.models.permission.findAll({
      where: whereClauses,
      include: this.models.role,
    });

    return filteredPermissions.map((permission: any) => {
      return this.toEntity(permission);
    });
  }
  /**
   * Adds a new Permission to the collection and return a PermissionDto.
   * @param {PermissionRequestParams} permission - The permission object to add.
   * @returns {Promise<PermissionDto>} - A promise that resolves to the added permission object (as a PermissionDto) if successful.
   */

  async create(permission: PermissionRequestParams): Promise<PermissionEntity> {
    this.validate(permission);

    const result = await this.models.permission.create({
      route: permission.method,
      method: permission.route,
    });
    return this.toEntity(result);
  }

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number> {
    const permissionDb = await this.models.permission.findByPk(id);
    if (!permissionDb) {
      throw new NotFoundException(id, 'Permission');
    }
    const indexPermission = await this.models.permission.destroy({
      where: {
        id,
      },
    });
    return indexPermission;
  }

  /**
   * Updates a permission with the specified ID and returns the updated PermissionDto.
   * @param {number} id - The ID of the permission to update.
   * @param {PermissionRequestParams} permission - The updated permission data.
   * @returns {Promise<PermissionDto>} - A promise that resolves to the updated permission object if successful, or false if unsuccessful.
   */
  async update(id: number, permission: PermissionRequestParams): Promise<PermissionEntity> {
    const permissionDb = await this.models.permission.findByPk(id);
    if (!permissionDb) {
      throw new NotFoundException(id, 'Permission');
    }
    this.validate(permission);

    permissionDb.set('route', permission.route);
    permissionDb.set('method', permission.method);

    // Guarda los cambios en la base de datos
    await permissionDb.save();

    return this.toEntity(permissionDb);
  }

  /**
   * Retrieves a PermissionDto by their ID from the collection.
   * @param {number} id - The ID of the permission to retrieve.
   * @returns {Promise<PermissionDto | false>} - A promise that resolves to the PermissionDto object if the permission is found, or false if the permission is not found.
  
   */
  async getById(id: number): Promise<PermissionEntity> {
    const permissionDb = await this.models.permission.findByPk(id);

    // Si el usuario no se encuentra, devuelve false
    if (!permissionDb) {
      throw new NotFoundException(id, 'Permission');
    }

    return this.toEntity(permissionDb);
  }

  toEntity(permission: any): PermissionEntity {
    return new PermissionEntity({
      id: new SerialId(permission.getDataValue('id')),
      route: new Name(permission.getDataValue('route')),
      method: new Method(permission.getDataValue('method')),
    });
  }

  private validate(permission: PermissionRequestParams): void {
    new PermissionEntity({
      route: new Name(permission.route),
      method: new Method(permission.method),
    });
  }
}
