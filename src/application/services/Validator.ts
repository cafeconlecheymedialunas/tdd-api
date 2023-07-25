/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validatorable } from '../../domain/interfaces/services/Validatorable';
import { ClientException } from '../../domain/types/errors';
import { ValidationError } from '../../domain/types/response';
import { RuleTypes, RULES, ValidationRule, MESSAGES } from '../../domain/types/validationRules';

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
  private getMessage = (field: string, rule: RuleTypes): string => {
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

  /**
   * Executes a validation method based on the given rule type and value.
   * @param {RuleTypes} rule - The rule type to execute.
   * @param {any} value - The value to validate.
   * @returns {boolean} - The result of the validation.
   * @throws {ClientException} - If the rule type is undefined.
   */
  private executeMethood = (rule: RuleTypes, value: any): boolean => {
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
        return this.min(value, 10);
      case RULES.max:
        return this.max(value, 10000);
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
