import { ValidationException } from "core/errors";
import { MESSAGES } from "core/types/validationRules";
import { isNotEmpty,hasCorrectMaxLength,hasCorrectMinLength,isEmail,isStrongPassword } from "./validaciones";
/**
 * Represents a User. The 'roles' property should store an array of Roles IDs.
 */
export class User {
  private id?: number;
  private firstName!: string;
  private lastName!: string;
  private email!: string;
  private password!: string;

  constructor(user: { id?: number; firstName: string; lastName: string; email: string; password: string }) {
    if(user.id){
      this.setId(user.id)
    }
    this.setFirstName(user.firstName)
    this.setLastName(user.lastName)
    this.setEmail(user.email)
    this.setPassword(user.password)
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

  public setId(id: number) {
    this.id = id;
  }

  public setFirstName(firstName: string) {
    if(isNotEmpty(firstName)){
      throw new ValidationException([{key:"firstName",error:MESSAGES.isNotEmpty}])
    }
    if(!hasCorrectMinLength(firstName,1)){
      throw new ValidationException([{key:"firstName",error:MESSAGES.min}])
    }
    this.firstName = firstName;
  }

  public setLastName(lastName: string) {
    if(!isNotEmpty(lastName)){
      throw new ValidationException([{key:"lastName",error:MESSAGES.isNotEmpty}])
    }
    if(!hasCorrectMinLength(lastName,1)){
      throw new ValidationException([{key:"lastName",error:MESSAGES.min}])
    }
    this.lastName = lastName;
  }

  public setEmail(email: string) {
    if(!isNotEmpty(email)){
      throw new ValidationException([{key:"email",error:MESSAGES.isNotEmpty}])
    }
    if(!isEmail(email)){
      throw new ValidationException([{key:"email",error:MESSAGES.isEmail}])
    }
    this.email = email;
  }

  public setPassword(password: string) {
    if(!isNotEmpty(password)){
      throw new ValidationException([{key:"password",error:MESSAGES.isNotEmpty}])
    }
    if(!isStrongPassword(password)){
      throw new ValidationException([{key:"password",error:MESSAGES.isStrongPassword}])
    }
    this.password = password;
  }
}
