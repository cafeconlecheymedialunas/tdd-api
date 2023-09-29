import { Role as RoleDto } from './Role';

export class User {
  private id: number = 0; // Valor por defecto para id
  private firstName: string = '';
  private lastName: string = '';
  private email: string = '';
  private password:string = '';
  private roles: RoleDto[] = []; // Valor por defecto para roles

  constructor(
    user: {
      id?: number; // El signo "?" indica que el id es opcional
      firstName?: string;
      lastName?: string;
      email?: string;
      password?:string;
      roles?: RoleDto[];
    } = {},
  ) {
    // Usamos un objeto vacío como valor por defecto del parámetro user

    // Si se proporcionan valores en user, los asignamos a las propiedades correspondientes
    if (user.id !== undefined) {
      this.id = user.id;
    }

    if (user.firstName !== undefined) {
      this.firstName = user.firstName;
    }

    if (user.lastName !== undefined) {
      this.lastName = user.lastName;
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

  // Resto de métodos de la clase
  public getId() {
    return this.id;
  }

  public getFirstName() {
    return this.firstName;
  }

  public getLastName() {
    return this.lastName;
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

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
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
