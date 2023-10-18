import { Clientable } from '../../../core/interfaces/repositories/auth/Clientable';
import { NotFoundException } from '../../../core/errors';
import { Client as ClientEntity } from '../../../core/entities/auth/Client';
import { ClientRequestParams } from '../../../core/types/requestInputs';
import { QueryFilter } from '../../../core/types/database';
import { Name } from '../../../core/entities/auth/Name';
import { Email } from '../../../core/entities/auth/Email';
import { Password } from '../../../core/entities/auth/Password';

import Application from '../../../Application';
import { Role } from '../../../core/entities/auth/Role';

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

        return clients.map(async (client: any) => {
            return await this.toEntity(client);
        });
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

        // Convierte los usuarios filtrados a objetos ClientDto
        return filteredClients.map(async (client: any) => {
            return await this.toEntity(client);
        });
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
    async delete(id: number): Promise<number> {
        const indexClient = await this.clientModel.destroy({
            where: {
                id,
            },
        });
        return indexClient;
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

        const roles = await client.getRole_id_roles()
        const roleEntities = await Promise.all(
            roles.map(async (role: any) => {
                const permissions = await role.getPermission_id_permissions()
                console.log(permissions)
                return new Role({
                    name: role.name,
                    permissions: permissions
                })
            })
        );
        console.log(roleEntities)


        return new ClientEntity({
            id: client.id,
            name: client.name,
            roles: client.roles
        });
    }
}
