
import { Permission } from "../entities/Permission.entity"
import { Role } from "../entities/Role.entity"


export enum names {
    ADD_USER = 'add_user',
    GET_USER = 'get_user',
    GET_USERS = 'get_users',
    UPDATE_USER = 'update_user',
    DELETE_USER = 'delete_user',
    ADMIN = 'admin',
    USER = 'user',
    EDITOR = 'editor'
}
export type PermissionsNames = names.ADD_USER | names.GET_USER | names.GET_USERS | names.UPDATE_USER | names.DELETE_USER

export type RolesNames = names.ADMIN| names.EDITOR | names.USER

export type RolesIds = 1 | 2 | 3


export interface RoleInterface {
    id: RolesIds,
    name: RolesNames,
    permissions: Permission[]
}

export interface PermissionInterface {
    id: number
    name: PermissionsNames
}
const getUser = new Permission(names.ADD_USER, 1)
const getUsers = new Permission(names.GET_USERS, 2)
const addUser = new Permission(names.GET_USER, 3)
const updateUser = new Permission(names.UPDATE_USER, 4)
const deleteUser = new Permission(names.DELETE_USER, 5)

const admin = new Role(names.ADMIN, 1, [getUser, getUsers, addUser, updateUser , deleteUser]);
const editor = new Role(names.EDITOR, 2, [addUser, getUser, getUsers]);
const user = new Role(names.USER, 3, [getUser, getUsers]);

export let rolesDefaults = {
    admin: admin,
    editor :editor,
    user: user
};
