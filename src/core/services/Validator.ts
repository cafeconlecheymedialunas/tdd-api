import { Validatorable } from '../interfaces/services/Validatorable';
import { ClientException } from '../types/errors';
import { ValidationError } from '../types/validationRules';
import { RuleTypes, RULES, ValidationRule, MESSAGES } from '../types/validationRules';

export class Validator implements Validatorable {
  validations: ValidationRule[] = [];
  errors: ValidationError[] = [];
  messages = MESSAGES;

  /**
   * Retrieves the error message for a given field and rule.
   * @param {string} field - The field for which the error message is retrieved.
   * @param {RuleTypes} rule - The rule for which the error message is retrieved.
   * @returns The formatted error message with the field name inserted.
   */
  getErrorMessage = (field: string, rule: RuleTypes): string => {
    return this.messages[rule].split('%s').join(field);
  };

  /**
   * Validates a set of validation rules against a given set of values.
   * @param {ValidationRule[]} validations - An array of validation rules to apply.
   * @returns {ValidationError[]} An array of validation errors, if any.
   */
  validate = (validations: ValidationRule[]): ValidationError[] => {
    this.validations = validations;
    this.errors = [];

    this.validations.forEach((validation) => {
      validation.rules.forEach((rule) => {
        if (!this.executeMethod(rule, validation.value)) {
          const message = this.getErrorMessage(validation.key, rule);

          this.setError(validation.key, message);
        }
      });
    });

    return this.errors;
  };

  /**
   * Executes a validation method based on the given rule type.
   * @param {RuleTypes} rule - The rule type to execute.
   * @param {unknown} value - The value to validate.
   * @returns {boolean} - The result of the validation.
   */
  executeMethod = (rule: RuleTypes, value: unknown): boolean => {
    switch (rule) {
      case RULES.isNotEmpty:
        return this.isNotEmpty(value);
      case RULES.isBoolean:
        return this.isBoolean(value);
      case RULES.isEmail:
        return this.isEmail(value);
      case RULES.isNumber:
        return this.isNumber(value);
      case RULES.isString:
        return this.isString(value);
      case RULES.isStrongPassword:
        return this.isStrongPassword(value);
      case RULES.min:
        return this.min(value as number, 10);
      case RULES.max:
        return this.max(value as number, 10000);
      default:
        throw new ClientException(500, 'Undefined Types');
    }
  };

  /**
   * Sets an error message for a given key and adds it to the list of errors.
   * @param {string} key - The key associated with the error.
   * @param {string} message - The error message.
   * @returns None
   */
  setError = (key: string, message: string): void => {
    this.errors.push({ key: key, error: message });
  };

  isNotEmpty = (value: unknown): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    if (typeof value === 'boolean') {
      return true;
    }
    return false;
  };

  isString = (value: unknown): boolean => typeof value === 'string';

  isNumber = (value: unknown): boolean => typeof value === 'number';

  isBoolean = (value: unknown): boolean => typeof value === 'boolean';

  min = (actual: number, min: number): boolean => actual >= min;

  max = (actual: number, max: number): boolean => actual <= max;

  isEmail = (value: unknown): boolean => {
    if (typeof value === 'string') {
      const regex = /\S+@\S+\.\S+/;

      return regex.test(value);
    }
    return false;
  };

  private isStrongPassword(value: unknown): boolean {
    if (typeof value === 'string') {
      const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

      return regex.test(value);
    }
    return false;
  }
}
