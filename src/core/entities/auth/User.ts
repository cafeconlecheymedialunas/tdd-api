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
  private id?: SerialId;
  private firstName!: Name;
  private lastName!: Name;
  private email!: Email;
  private password!: Password;
  private roles!: RoleEntity[];

  constructor(user: {
    id?: SerialId;
    firstName: Name;
    lastName:Name;
    email: Email;
    password: Password;
    roles: RoleEntity[];
  }) {
    if (user.id) {
      this.setId(user.id);
    }
    this.setFirstName(user.firstName);
    this.setLastName(user.lastName);
    this.setEmail(user.email);
    this.setPassword(user.password);
    this.setRoles(user.roles);
  }

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

  public setId(id:SerialId) {
    this.id = id;
  }

  public setFirstName(firstName:Name) {
    if (isNotEmpty(firstName.getValue())) {
      throw new ValidationException([{ key: 'firstName', error: MESSAGES.isNotEmpty }]);
    }
    if (!hasCorrectMinLength(firstName.getValue(), 1)) {
      throw new ValidationException([{ key: 'firstName', error: MESSAGES.min }]);
    }
    this.firstName = firstName;
  }

  public setLastName(lastName: Name) {
    this.lastName = lastName;
  }

  public setEmail(email: Email) {
   
    this.email = email;
  }

  public setPassword(password:Password) {
    this.password = password;
  }

  public setRoles(roles: RoleEntity[]) {
    this.roles = roles;
  }
}
