import { ValidationException } from '../../errors';
import { isEmail, isNotEmpty } from './validaciones';
import { MESSAGES } from '../../types/validationRules';

export class Email {
  private value!: string;

  constructor(value: string) {
    this.setValue(value);
  }
  public setValue(value: string): void {
    this.ensureIsValid(value);
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
  private ensureIsValid(value: string) {
    if (!isEmail(value)) {
      throw new ValidationException([{ key: 'email', error: MESSAGES.isEmail }]);
    }
  }
}
