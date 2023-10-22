import { Role as RoleDto } from './Role';

export class User {
  private id: number = 0;
  private firstname: string = '';
  private lastname: string = '';
  private email: string = '';
  private password: string = '';
  private roles: RoleDto[] = [];

  constructor(
    user: {
      id?: number;
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
      roles?: RoleDto[];
    } = {},
  ) {

    if (user.id !== undefined) {
      this.id = user.id;
    }

    if (user.firstname !== undefined) {
      this.firstname = user.firstname;
    }

    if (user.lastname !== undefined) {
      this.lastname = user.lastname;
    }

    if (user.email !== undefined) {
      this.email = user.email;
    }

    if (user.password !== undefined) {
      this.password = user.password;
    }

    if (user.roles !== undefined) {
      this.roles = user.roles;
    }
  }

  public getId() {
    return this.id;
  }

  public getFirstName() {
    return this.firstname;
  }

  public getLastName() {
    return this.lastname;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getRoles() {
    return this.roles;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setFirstName(firstname: string) {
    this.firstname = firstname;
  }

  setLastName(lastname: string) {
    this.lastname = lastname;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setRoles(roles: RoleDto[]) {
    this.roles = roles;
  }
}
