import { PermissionDto } from "../../application/dtos/PermissionDto";
import { Permission } from "../../domain/entities/Permission.entity";
import { PermissionRepositoryInterface } from "../../domain/interfaces/repositories/PermissionRepositoryInterface";
import { MockRepository } from "./MockRepository";
export class PermissionMockRepository extends MockRepository implements PermissionRepositoryInterface {
  list: Permission[] = [];
  collection = 'permissions'
  async getByRouteMethod(route: string, method: string): Promise<Permission | false> {
    try {
      this.list = await this.readFile(this.collection);
      const permission = this.list.find(function (elem) {
        return elem.method === method && elem.route === route
      })
      return (permission !== undefined) ? permission : false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getByIdList(ids: number[]): Promise<Permission[] | undefined> {
    try {
      this.list = await this.readFile(this.collection);
      const roles = this.list.filter(function (item) {
        return ids.indexOf(item.id) != -1;
      });
      return (roles !== undefined) ? roles : undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  async getById(id: number): Promise<PermissionDto | undefined> {
    try {
      this.list = await this.readFile(this.collection);
      const role = this.list.find(function (elem) {
        return elem.id === id
      })
      return (role !== undefined) ? role : undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }
}