import { RoleDto } from "../../application/dtos/RoleDto";
import { Permission } from "../../domain/entities/Permission.entity";
import { Role } from "../../domain/entities/Role.entity";
import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface";
import { ClientError } from "../utils";
import { MockRepository } from "./MockRepository";
export class RoleMockRepository extends MockRepository implements RoleRepositoryInterface {
  list: Role[] = [];
  collection = 'roles'

  async getById(id: number): Promise<RoleDto> {
      this.list = await this.readFile(this.collection);
      const role = this.list.find(function (elem) {
        return elem.id === id
      })
      if (role === undefined) throw new ClientError('nO SE PUDO OBTENER', 400)
      return role


  
  }

 
  async getByIdList(ids: number[]): Promise<RoleDto[]> {

    this.list = await this.readFile(this.collection);
    const roles = this.list.filter(function (item) {
      return ids.indexOf(item.id) != -1;
    });
    if (roles === undefined) throw new ClientError('nO SE PUDO OBTENER', 400)
    return roles

  }
  async add(role: { name: string, permissions: number[] }): Promise<RoleDto> {

    const id = this.generateId()
    const newRole = new Role(
      id,
      role.name,
      role.permissions
    )
    this.list = await this.readFile(this.collection);
    this.list.push(newRole);
    await this.writeFile(this.collection, this.list);

    if (newRole === undefined) throw new ClientError('nO SE PUDO OBTENER', 400)
    return newRole
s
  }
}