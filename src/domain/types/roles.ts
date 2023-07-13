import { Role } from "../entities/Role.entity";
import { DELETE_USER, UPDATE_USER } from "./permissions";

export const admin = new Role(1, 'Admin', [
    UPDATE_USER.id,
    DELETE_USER.id
])

export const user = new Role(2, 'User', [
    UPDATE_USER.id
])