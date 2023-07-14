import { Permission } from '../entities/Permission.entity';

const UPDATE_USER = new Permission(1, 'user/:id', 'PUT');
const DELETE_USER = new Permission(2, 'user', 'DELETE');
const GET_USER = new Permission(3, 'user', 'GET');
const GET_USERS = new Permission(4, 'users', 'GET');

const ADD_ROLE = new Permission(5, 'roles', 'POST');
const EDIT_ROLE = new Permission(6, 'role/:id', 'PUT');
const DELETE_ROLE = new Permission(7, 'role/:id', 'DELETE');

export const PERMISSIONS_DEFAULT = {
  UPDATE_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
};
