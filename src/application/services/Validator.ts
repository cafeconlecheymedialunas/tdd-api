/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatorInterface } from '../../domain/interfaces/services/Validatorable';
import { ClientError } from '../../domain/types/errors';
import { ValidationError } from '../../domain/types/response';
import { RuleTypes, Rules, ValidationRule } from '../../domain/types/validationRules';

export class ValidatorService implements ValidatorInterface {
  validations: ValidationRule[] = [];
  errors: ValidationError[] = [];

  private getMessages = (field: any): { [key: string]: string } => {
    return {
      isNotEmpty: `The ${field} is required`,
      isString: `The ${field} must be a string`,
      isNumber: `The ${field} must be a string`, // Corrected typo here
      isBoolean: `The ${field} must be a boolean`,
      min: `The ${field} have at least one digit`,
      max: `The ${field} have at least 120 digit`,
      isEmail: `The ${field} is not a valid email`,
      // eslint-disable-next-line max-len
      isStrongPassword: `The ${field} must be at least 8 characters long, contain at least one uppercase letter and one lowercase letter, have at least one digit, and include one special character`,
    };
  };

  validate = (validations: ValidationRule[]): ValidationError[] => {
    this.validations = validations;
    this.errors = [];

    this.validations.map((item) => {
      const messages = this.getMessages(item.key);

      item.rules.map((rule) => {
        if (!this.executeMethood(rule, item.value)) {
          this.setError(item.key, messages[rule]);
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
        throw new ClientError(500, 'Undefined Types');
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
