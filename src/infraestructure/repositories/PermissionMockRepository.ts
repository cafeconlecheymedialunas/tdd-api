import { PermissionDto } from "../../application/dtos/PermissionDto";
import { Permission } from "../../domain/entities/Permission.entity";
import { PermissionRepositoryInterface } from "../../domain/interfaces/repositories/PermissionRepositoryInterface";
import { ClientError } from "../utils";
import { MockRepository } from "./MockRepository";
export class PermissionMockRepository extends MockRepository implements PermissionRepositoryInterface {
  list: Permission[] = [];
  collection = 'permissions'
  async getByRouteMethod(route: string, method: string): Promise<Permission> {

    this.list = await this.readFile(this.collection);
    const permission = this.list.find(function (elem) {
      return elem.method === method && elem.route === route
    })
    if (permission === undefined) throw new ClientError('nO SE PUDO OBTENER', 400)
    return permission

  }

  async getByIdList(ids: number[]): Promise<Permission[]> {

    this.list = await this.readFile(this.collection);
    const roles = this.list.filter(function (item) {
      return ids.indexOf(item.id) != -1;
    });
    if (roles === undefined) throw new ClientError('nO SE PUDO OBTENER', 400)
    return roles

  }

  async getById(id: number): Promise<PermissionDto> {

    this.list = await this.readFile(this.collection);
    const role = this.list.find(function (elem) {
      return elem.id === id
    })
    if (role === undefined) throw new ClientError('nO SE PUDO OBTENER', 400)
    return role
  }
}
