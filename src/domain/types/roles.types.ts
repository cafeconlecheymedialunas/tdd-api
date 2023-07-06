
import { Permission } from "../entities/Permission.entity"
import { Role } from "../entities/Role.entity"
export interface RoleInterface {
    id: number,
    name: string,
    permissions: Permission[]
}

export interface PermissionInterface {
    id: number
    route: string,
    method : string
}

export const getUsers= new Permission('users', 'GET', 1);
export const getUser = new Permission('users/:id', 'GET', 2);
export const addUser = new Permission('users', 'POST', 3);
export const updateUser = new Permission('users', 'PUT', 4);
export const deleteUser = new Permission('users', 'DELETE', 5);

export const admin = new Role('admin', 1, [getUser, getUsers, addUser, updateUser , deleteUser]);
export const editor = new Role('editor', 2, [addUser, getUser, getUsers]);
export const user = new Role('user', 3, [getUser, getUsers]);

export let rolesDefaults = {
    admin: admin,
    editor :editor,
    user: user
};
