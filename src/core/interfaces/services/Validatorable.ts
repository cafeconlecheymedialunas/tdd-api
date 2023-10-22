import { ValidationError } from '../../types/validationRules';
import { ValidationRule } from '../../types/validationRules';

export interface Validatorable {
  validate(validations: ValidationRule[]): ValidationError[];
}
