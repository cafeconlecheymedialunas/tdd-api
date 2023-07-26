import { Role } from '../../domain/entities/Role';

import { Permission } from '../../domain/entities/Permission';

const UPDATE_USER = new Permission(1, '/users/:id', 'PUT');

const DELETE_USER = new Permission(2, '/users', 'DELETE');

const GET_USER = new Permission(3, '/users/:id', 'GET');

const ALL_USERS = new Permission(4, '/users', 'GET');

const ADD_ROLE = new Permission(5, '/roles', 'POST');

const EDIT_ROLE = new Permission(6, '/roles/:id', 'PUT');

const DELETE_ROLE = new Permission(7, '/roles/:id', 'DELETE');

export const PERMISSIONS_DEFAULT = {
  UPDATE_USER,
  DELETE_USER,
  GET_USER,
  ALL_USERS,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
};

const ADMIN = new Role(1, 'Admin', [
  PERMISSIONS_DEFAULT.UPDATE_USER.id,
  PERMISSIONS_DEFAULT.DELETE_USER.id,
  PERMISSIONS_DEFAULT.ADD_ROLE.id,
  PERMISSIONS_DEFAULT.GET_USER.id,
  PERMISSIONS_DEFAULT.ALL_USERS.id,
  PERMISSIONS_DEFAULT.EDIT_ROLE.id,
  PERMISSIONS_DEFAULT.DELETE_ROLE.id,
]);

const USER = new Role(2, 'User', [PERMISSIONS_DEFAULT.UPDATE_USER.id]);

export const ROLES_DEFAULT = [ADMIN, USER];
