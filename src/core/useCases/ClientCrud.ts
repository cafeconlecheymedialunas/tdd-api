import { Clientable } from '../interfaces/repositories/auth/Clientable';
import { Client as ClientEntity } from '../entities/auth/Client';
import { ClientRequestParams } from '../types/requestInputs';
import { Request } from 'express';
export class ClientCrud {
  private readonly clientRepo: Clientable;

  constructor(ClientRepository: Clientable) {
    this.clientRepo = ClientRepository;
  }


  async create(req: Request): Promise<ClientEntity> {

    const client: ClientRequestParams = req.body;

    this.validate(client);

    const clients = await this.clientRepo.create(client);

    return clients;
  }

  async getAll(): Promise<ClientEntity[]> {
    const clients = await this.clientRepo.getAll();

    return clients;
  }

  async getById(req: Request): Promise<ClientEntity> {
    const id = parseInt(req.params.id);

    const client = await this.clientRepo.getById(id);

    return client;
  }

  async update(req: Request): Promise<ClientEntity> {
    const id = parseInt(req.params.id);

    const client = req.body;

    this.validate(client);

    const result = await this.clientRepo.update(id, client);

    return result;
  }

  async delete(req: Request): Promise<boolean> {

    const id = parseInt(req.params.id);

    const result = await this.clientRepo.delete(id);

    return result;
  }

  private validate(client: any): ClientEntity {
    return new ClientEntity({
      name: client.name,
      roles: client.roles
    });
  }

}
