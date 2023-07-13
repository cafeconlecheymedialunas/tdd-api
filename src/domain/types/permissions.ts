import { Permission } from "../entities/Permission.entity";

export const UPDATE_USER = new Permission(1, 'user/:id', 'PUT')
export const DELETE_USER = new Permission(2, 'user', 'DELETE')
export const GET_USER = new Permission(3, 'user', 'GET')
export const GET_USERS = new Permission(4, 'users', 'GET')

export const ADD_ROLE = new Permission(5, 'roles', 'POST')
export const EDIT_ROLE = new Permission(6, 'role/:id', 'PUT')  
export const DELETE_ROLE = new Permission(7, 'role/:id', 'DELETE')

