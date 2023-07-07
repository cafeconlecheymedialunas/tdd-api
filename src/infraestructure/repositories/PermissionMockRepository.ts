



import { RoleDto } from "../../application/dtos/RoleDto";
import { Permission } from "../../domain/entities/Permission.entity";
import { PermissionRepositoryInterface } from "../../domain/interfaces/repositories/PermissionRepositoryInterface";

import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface";

import { MockRepository } from "./MockRepository";
export class PermissionMockRepository extends MockRepository implements PermissionRepositoryInterface {
  list: Permission[] = [];
  collection = 'permissions'

 

  async getByRouteMethod(route: string,method:string): Promise<Permission | false> {
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



 
}