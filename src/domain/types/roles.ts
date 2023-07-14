import { Role } from '../entities/Role.entity';
import { PERMISSIONS_DEFAULT } from './permissions';

const ADMIN = new Role(1, 'Admin', [PERMISSIONS_DEFAULT.UPDATE_USER.id, PERMISSIONS_DEFAULT.DELETE_USER.id]);

const USER = new Role(2, 'User', [PERMISSIONS_DEFAULT.UPDATE_USER.id]);

export const ROLES = [ADMIN, USER];
