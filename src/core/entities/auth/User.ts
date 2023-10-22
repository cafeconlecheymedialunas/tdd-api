import { ValidationException } from '../../errors';
import { MESSAGES } from '../../types/validationRules';
import { Email } from './Email';
import { SerialId } from './SerialId';
import { Name } from './Name';
import { Password } from './Password';
import { Role as RoleEntity } from './Role';
import { isNotEmpty, hasCorrectMaxLength, hasCorrectMinLength, isEmail, isStrongPassword } from './validaciones';
/**
 * Represents a User. The 'roles' property should store an array of Roles IDs.
 */
export class User {
  private id?: number;
  private firstname!: string;
  private lastname!: string;
  private email!: string;
  private password!: string;
  private roles!: RoleEntity[];

  constructor(user: {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: RoleEntity[];
  }) {
    if (user.id) {
      this.setId(user.id);
    }
    this.setFirstName(user.firstname);
    this.setLastName(user.lastname);
    this.setEmail(user.email);
    this.setPassword(user.password);
    this.setRoles(user.roles);
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

  public setId(value: number) {
    const id = new SerialId(value)
    this.id = id.getValue();
  }

  public setFirstName(value: string) {
    const firstname = new Name(value)
    this.firstname = firstname.getValue();
  }

  public setLastName(value: string) {
    const lastname = new Name(value)
    this.lastname = lastname.getValue();
  }

  public setEmail(value: string) {
    const email = new Email(value)
    this.email = email.getValue();
  }

  public setPassword(value: string) {
    const password = new Password(value)
    this.password = password.getValue();
  }

  public setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }
}
