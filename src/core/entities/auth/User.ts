/**
 * Represents a User. The 'roles' property should store an array of Roles IDs.
 */
export class User {
  private id: number;
  private name: string;
  private email: string;
  private password: string;
  private roles: number[] = [];

  constructor(user: { id: number; name: string; email: string; password: string; roles: number[] }) {
    this.name = user.name;

    this.email = user.email;

    this.password = user.password;

    this.id = user.id;

    this.roles = user.roles;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
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

  public setName(name: string) {
    this.name = name;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setRoles(roles: number[]) {
    this.roles = roles;
  }
}
