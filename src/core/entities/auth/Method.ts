import { ValidationException } from '../../errors';
import { isEmail, isNotEmpty } from './validaciones';
import { MESSAGES } from '../../types/validationRules';

export class Method {
  private value!: string;
  private enabledMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
  constructor(value: string) {
    this.setValue(value);
  }
  public setValue(value: string): void {
    this.value = value;
    this.ensureIsValid(value);
  }

  public getValue() {
    return this.value;
  }
  private ensureIsValid(value: string) {
    console.log(value);
    if (value === '') {
      throw new ValidationException([{ key: 'method', error: MESSAGES.isEmail }]);
    }
    if (!this.enabledMethods.includes(value)) {
      console.log(value);
      throw new ValidationException([{ key: 'method', error: 'No esta incluido' }]);
    }
  }
}
