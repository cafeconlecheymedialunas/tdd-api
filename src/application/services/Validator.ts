/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validatorable } from '../../domain/interfaces/services/Validatorable';
import { ClientException } from '../../domain/types/errors';
import { ValidationError } from '../../domain/types/response';
import { RuleTypes, Rules, ValidationRule } from '../../domain/types/validationRules';

export class Validator implements Validatorable {
  validations: ValidationRule[] = [];
  errors: ValidationError[] = [];
  messages = {
    isNotEmpty: `The %s is required`,
    isString: `The %s must be a string`,
    isNumber: `The %s must be a string`, // Corrected typo here
    isBoolean: `The %s must be a boolean`,
    min: `The %s have at least one digit`,
    max: `The %s have at least 120 digit`,
    isEmail: `The %s is not a valid email`,
    // eslint-disable-next-line max-len
    isStrongPassword: `The %s must be at least 8 characters long, contain at least one uppercase letter and one lowercase letter, have at least one digit, and include one special character`,
  };
  private getMessage = (field: string, rule: RuleTypes): string => {
    return this.messages[rule].split('%s').join(field);
  };

  validate = (validations: ValidationRule[]): ValidationError[] => {
    this.validations = validations;
    this.errors = [];

    this.validations.map((item) => {
      item.rules.map((rule) => {
        if (!this.executeMethood(rule, item.value)) {
          const message = this.getMessage(item.key, rule);

          this.setError(item.key, message);
        }
      });
    });

    return this.errors;
  };

  private executeMethood = (rule: RuleTypes, value: any): boolean => {
    switch (rule) {
      case Rules.isNotEmpty:
        return this.isNotEmpty(value);
      case Rules.isBoolean:
        return this.isBoolean(value);
      case Rules.isEmail:
        return this.isEmail(value);
      case Rules.isNumber:
        return this.isNumber(value);
      case Rules.isString:
        return this.isString(value);
      case Rules.isStrongPassword:
        return this.isStrongPassword(value);
      case Rules.min:
        return this.min(value, 10);
      case Rules.max:
        return this.max(value, 10000);
      default:
        throw new ClientException(500, 'Undefined Types');
    }
  };
  private setError = (key: string, message: string): void => {
    this.errors.push({ key: key, error: message });
  };

  private isNotEmpty = (value: any): boolean => {
    return value && value !== '';
  };

  private isString = (value: any): boolean => {
    return typeof value === 'string';
  };

  private isNumber = (value: any): boolean => {
    return typeof value === 'number';
  };

  private isBoolean = (value: any): boolean => {
    return typeof value === 'boolean';
  };

  private min = (min: number, actual: number): boolean => actual >= min;

  private max = (max: number, actual: number): boolean => actual <= max;

  private isEmail = (value: string): boolean => {
    const regex = /\S+@\S+\.\S+/;

    return regex.test(value);
  };

  private isStrongPassword(value: string): boolean {
    const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    return regex.test(value);
  }
}
