import { Clientable } from '../../../core/interfaces/repositories/auth/Clientable';
import { NotFoundException } from '../../../core/errors';

import { ClientRequestParams } from '../../../core/types/requestInputs';
import { QueryFilter } from '../../../core/types/database';
import { Name } from '../../../core/entities/auth/Name';
import { Email } from '../../../core/entities/auth/Email';
import { Password } from '../../../core/entities/auth/Password';

import Application from '../../../Application';
import { Role as RoleEntity } from '../../../core/entities/auth/Role';
import { Client as ClientEntity } from '../../../core/entities/auth/Client';
import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';

export class Client implements Clientable {
    protected clientModel: any;
    protected roleModel: any;
    constructor() {
        const models = Application.getInstance().getModels()
        this.clientModel = models.clients
        this.roleModel = models.roles
    }
    /**
     * Retrieves all ClientDto data from the collection.
     * @returns {Promise<ClientDto[]>} - A promise that resolves to an array of ClientDto objects if successful.
     */
    async getAll(): Promise<ClientEntity[]> {
        const clients = await this.clientModel.findAll({
            include: [
                {
                    model: this.roleModel,
                    as: 'role_id_roles'
                },
            ]
        });

        return await this.mapEntities(clients)
    }

    /**
     * Filters clients based on given conditions.
     * @param {QueryFilter} conditions - The conditions to filter clients.
     * @returns {Promise<ClientDto[]>} - A promise that resolves to an array of filtered ClientDto objects if successful.
     */
    async filter(whereClauses: QueryFilter): Promise<ClientEntity[]> {
        const filteredClients = await this.clientModel.findAll({
            where: whereClauses,
            include: [
                {
                    model: this.roleModel,
                    as: 'role_id_roles'
                },
            ]
        });

        return await this.mapEntities(filteredClients)
    }
    /**
     * Adds a new Client to the collection and return a ClientDto.
     * @param {ClientRequestParams} client - The client object to add.
     * @returns {Promise<ClientDto>} - A promise that resolves to the added client object (as a ClientDto) if successful.
     */
    async create(client: ClientRequestParams): Promise<ClientEntity> {



        const clientDb = await this.clientModel.create({
            name: client.name,

        });


        if (client.roles && client.roles.length > 0) {
            const selectedRoles = await this.roleModel.findAll({
                where: {
                    id: client.roles,
                },
            });

            await clientDb.addRole_id_roles(selectedRoles)
            await clientDb.save()



        }


        return await this.toEntity(clientDb)
    }

    /**
     * Deletes an item from the collection based on its ID.
     * @param {number} id - The ID of the item to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, or false if the item was not found.
     */
    async delete(id: number): Promise<boolean> {

        const affectedRows = await this.clientModel.destroy({
            where: {
                id,
            },
        });

        if (affectedRows === 0) {
            throw new NotFoundException(id, 'Client');
        }
        return affectedRows
    }

    /**
     * Updates a client with the specified ID and returns the updated ClientDto.
     * @param {number} id - The ID of the client to update.
     * @param {ClientRequestParams} client - The updated client data.
     * @returns {Promise<ClientDto>} - A promise that resolves to the updated client object if successful, or false if unsuccessful.
     */
    async update(id: number, client: ClientRequestParams): Promise<ClientEntity> {
        const clientDb = await this.clientModel.findByPk(id);
        if (!clientDb) {
            throw new NotFoundException(id, 'Client');
        }

        clientDb.set('firstname', client.name);

        await this.syncRoles(client.roles, clientDb)



        await clientDb.save();

        return await this.toEntity(clientDb);
    }

    /**
     * Retrieves a ClientDto by their ID from the collection.
     * @param {number} id - The ID of the client to retrieve.
     * @returns {Promise<ClientDto | false>} - A promise that resolves to the ClientDto object if the client is found, or false if the client is not found.
    
     */
    async getById(id: number): Promise<ClientEntity> {
        const clientDb = await this.clientModel.findByPk(id, {
            include: [
                {
                    model: this.roleModel,
                    as: 'role_id_roles'
                },
            ]
        });

        if (!clientDb) {
            throw new NotFoundException(id, 'Client');
        }

        return await this.toEntity(clientDb);
    }

    async clientExist(email: string): Promise<boolean> {
        const clientDb = await this.clientModel.findOne({ where: { email: email } });
        if (clientDb) {
            return true
        }
        return false
    }

    async toEntity(client: any): Promise<ClientEntity> {

        let roleEntities: RoleEntity[] = []

        let roles = await client.getRole_id_roles()



        await Promise.all(

            Object.keys(roles).map(async (indexRole) => {
                const permissions = await roles[indexRole].getPermission_id_permissions()

                const permissionEntities = Object.keys(permissions).map((indexPermission) => {
                    return new PermissionEntity({
                        id: permissions[indexPermission].id,
                        route: permissions[indexPermission].route,
                        method: permissions[indexPermission].method
                    })
                });

                roleEntities.push(
                    new RoleEntity({
                        id: roles[indexRole].id,
                        name: roles[indexRole].name,
                        permissions: permissionEntities
                    })
                )

            })


        )



        return new ClientEntity({
            id: client.id,
            name: client.name,
            roles: roleEntities
        });
    }

    async mapEntities(clients: any) {
        const clientEntities = await Promise.all(
            Object.keys(clients).map(async (indexClient) => {
                return await this.toEntity(clients[indexClient])
            })
        )

        return clientEntities;
    }

    async syncRoles(roles: any, client: any) {

        console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(client)))
        const rolesDb = await client.getRole_id_roles()
        await client.removeRole_id_roles(rolesDb);

        if (roles && roles.length > 0) {
            const selectedRoles = await this.roleModel.findAll({
                where: {
                    id: roles,
                },
            });
            await client.addRole_id_roles(selectedRoles);
        }
    }
}
