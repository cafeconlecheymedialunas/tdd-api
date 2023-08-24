import { ValidationError } from 'domain/types/errors';
import { ValidationRule } from 'domain/types/validationRules';

export interface Validatorable {
  validate(validations: ValidationRule[]): ValidationError[];
}
