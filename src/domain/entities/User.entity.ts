export class User {
  name: string;
  email: string;
  password: string;
  id: number;
  roles: number[];
  [key: string]: any;
  constructor(name: string, email: string, password: string, id: number, roles: number[] = []) {
    this.name = name;

    this.email = email;

    this.password = password;

    this.id = id;

    this.roles = roles;
  }
}
