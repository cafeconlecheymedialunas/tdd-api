import { Role as RoleDto } from './Role';

/**
 * This DTO represents the return of all methods from the User Repository. It includes the 'roles' property that will be transformed into a RoleDto[] array by the User Mapper.
 * @class User
 */
export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _roles: RoleDto[];

  constructor(user: { id: number; name: string; email: string; password: string; roles: RoleDto[] }) {
    this._id = user.id;

    this._name = user.name;

    this._email = user.email;

    this._password = user.password;

    this._roles = user.roles;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  public get roles() {
    return this._roles;
  }

  public set id(id: number) {
    this._id = id;
  }

  public set name(name: string) {
    this._name = name;
  }

  public set email(email: string) {
    this._email = email;
  }

  public set password(password: string) {
    this._password = password;
  }

  public set roles(roles: RoleDto[]) {
    this._roles = roles;
  }
}
