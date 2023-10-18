import { ClientRequestParams } from '../../../types/requestInputs';
import { QueryFilter } from '../../../types/database';
import { Client as ClientEntity } from '../../../entities/auth/Client';

export interface Clientable {
    getAll(): Promise<ClientEntity[]>;
    filter(conditions: QueryFilter): Promise<ClientEntity[]>;
    create(client: ClientRequestParams): Promise<ClientEntity>;
    delete(id: number): Promise<number>;
    update(id: number, client: ClientRequestParams): Promise<ClientEntity>;
    getById(id: number): Promise<ClientEntity>;
    //getRoles(roles: number[]): RoleEntity[];
    toEntity(client: ClientRequestParams): Promise<ClientEntity>;
    //entityList(clients: ClientEntity[] | ClientModel[]): ClientEntity[];
}
