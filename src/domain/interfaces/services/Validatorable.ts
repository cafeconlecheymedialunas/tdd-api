import { ValidationError } from '../../types/response';
import { ValidationRule } from '../../types/validationRules';

export interface Validatorable {
  validate(validations: ValidationRule[]): ValidationError[];
}
