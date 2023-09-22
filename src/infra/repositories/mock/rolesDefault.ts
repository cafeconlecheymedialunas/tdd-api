import { Role as RoleEntity } from '../../../core/entities/auth/Role';

import { Permission as PermissionEntity } from '../../../core/entities/auth/Permission';

const UPDATE_USER = new PermissionEntity(1, '/users/:id', 'PUT');

const DELETE_USER = new PermissionEntity(2, '/users', 'DELETE');

const GET_USER = new PermissionEntity(3, '/users/:id', 'GET');

const ALL_USERS = new PermissionEntity(4, '/users', 'GET');

const ADD_ROLE = new PermissionEntity(5, '/roles', 'POST');

const EDIT_ROLE = new PermissionEntity(6, '/roles/:id', 'PUT');

const DELETE_ROLE = new PermissionEntity(7, '/roles/:id', 'DELETE');

export const PERMISSIONS_DEFAULT = {
  UPDATE_USER,
  DELETE_USER,
  GET_USER,
  ALL_USERS,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
};

const ADMIN = new RoleEntity(1, 'Admin', [
  PERMISSIONS_DEFAULT.UPDATE_USER.getId(),
  PERMISSIONS_DEFAULT.DELETE_USER.getId(),
  PERMISSIONS_DEFAULT.ADD_ROLE.getId(),
  PERMISSIONS_DEFAULT.GET_USER.getId(),
  PERMISSIONS_DEFAULT.ALL_USERS.getId(),
  PERMISSIONS_DEFAULT.EDIT_ROLE.getId(),
  PERMISSIONS_DEFAULT.DELETE_ROLE.getId(),
]);

const USER = new RoleEntity(2, 'User', [PERMISSIONS_DEFAULT.UPDATE_USER.getId()]);

export const ROLES_DEFAULT = [ADMIN, USER];
