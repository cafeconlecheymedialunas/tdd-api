import { Permission } from "../../domain/entities/Permission.entity";
import { Role } from "../../domain/entities/Role.entity";
import { RoleRepositoryInterface } from "../../domain/interfaces/repositories/RoleRepositoryInterface";
import { MockRepository } from "./MockRepository";
export class RoleMockRepository extends MockRepository implements RoleRepositoryInterface {
  list: Role[] = [];
  collection = 'roles'
  async getById(id: number): Promise<Role | undefined> {
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
  async getByIdList(ids: number[]): Promise<Role[] | undefined> {
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
  async add(role: { name: string, permissions: Permission[] }): Promise<false | Role> {
    try {
      const id = this.generateId()
      const newRole = new Role(
        id,
        role.name,
        role.permissions
      )
      this.list = await this.readFile(this.collection);
      this.list.push(newRole);
      await this.writeFile(this.collection, this.list);
      return newRole
    } catch (error) {
      return false
    }
  }
  generateId(): number {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const uniqueNumber = timestamp + random;
    return uniqueNumber;
  }
}