import { ValidationError } from '../../types/response';
import { ValidationRule } from '../../types/validationRules';

export interface ValidatorInterface {
  validate(validations: ValidationRule[]): ValidationError[];
}
