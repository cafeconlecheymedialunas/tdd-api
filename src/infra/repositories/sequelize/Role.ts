import { Roleable } from '../../../core/interfaces/repositories/auth/Roleable';
import { NotFoundException } from '../../../core/errors';
import { RoleRequestParams } from '../../../core/types/requestInputs';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
import { QueryFilter } from '../../../core/types/database';
import { Name } from '../../../core/entities/auth/Name';
import { SerialId } from '../../../core/entities/auth/SerialId';
import Application from '../../../Application';

export class Role implements Roleable {
  protected roleModel: any;
  protected permissionModel: any
  constructor() {
    const models = Application.getInstance().getModels()
    this.permissionModel = models.permissions
    this.roleModel = models.roles
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
    const roles = await this.roleModel.findAll({
      include: [
        {
          model: this.permissionModel,
          as: 'permission_id_permissions'
        },
      ]
    });

    roles.forEach((role: any) => {
      const permissions = role.permission_id_permissions; // Accede a la propiedad de permisos asociados

      // Haz algo con los permisos, por ejemplo, imprímelos en la consola
      console.log(`Permisos para el rol ${role.name}:`, permissions);
    });


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
    const filteredRoles = await this.roleModel.findAll({
      where: whereClauses,
      include: [
        {
          model: this.permissionModel,
          as: 'permission_id_permissions'
        },
      ]
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

    const roleDb = await this.roleModel.create({
      name: role.name,
    });

    // Asocia los permisos al rol
    if (role.permissions && role.permissions.length > 0) {
      const selectedPermissions = await this.permissionModel.findAll({
        where: {
          id: role.permissions,
        },
      });

      await roleDb.addPermission_id_permissions(selectedPermissions)
      await roleDb.save()

    }


    return this.toEntity(roleDb);
  }

  /**
   * Deletes an item from the collection based on its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
   */
  async delete(id: number): Promise<number> {

    const roleDb = await this.roleModel.findByPk(id);

    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    const indexRole = await this.roleModel.destroy({
      where: {
        id,
      },
    });
    console.log(indexRole)

    return indexRole;
  }

  /**
   * Updates a role with the specified ID and returns the updated RoleDto.
   * @param {number} id - The ID of the role to update.
   * @param {RoleRequestParams} role - The updated role data.
   * @returns {Promise<RoleDto>} - A promise that resolves to the updated role object if successful, or false if unsuccessful.
   */
  async update(id: number, role: RoleRequestParams): Promise<RoleEntity> {
    const roleDb = await this.roleModel.findByPk(id);

    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    roleDb.set('name', role.name);

    const permissions = await this.permissionModel.findAll({
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
    const roleDb = await this.roleModel.findByPk(id, {
      include: [
        {
          model: this.permissionModel,
          as: 'permission_id_permissions'
        },
      ]

    });

    // Si el usuario no se encuentra, devuelve false
    if (!roleDb) {
      throw new NotFoundException(id, 'Role');
    }

    return this.toEntity(roleDb);
  }

  private toEntity(role: any): RoleEntity {
    return new RoleEntity({
      id: role.id,
      name: role.name,
      permissions: role.permissions,
    });
  }
}
