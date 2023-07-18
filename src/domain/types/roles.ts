import { Role } from '../entities/Role.entity';

import { PERMISSIONS_DEFAULT } from './permissions';

const ADMIN = new Role(1, 'Admin', [
  PERMISSIONS_DEFAULT.UPDATE_USER.id,
  PERMISSIONS_DEFAULT.DELETE_USER.id,
  PERMISSIONS_DEFAULT.ADD_ROLE.id,
  PERMISSIONS_DEFAULT.GET_USER.id,
  PERMISSIONS_DEFAULT.EDIT_ROLE.id,
  PERMISSIONS_DEFAULT.DELETE_ROLE.id,
]);

const USER = new Role(2, 'User', [PERMISSIONS_DEFAULT.UPDATE_USER.id]);

export const ROLES = [ADMIN, USER];
