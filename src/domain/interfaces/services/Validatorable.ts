import { ValidationError } from '../../types/responseOutputs';
import { ValidationRule } from '../../types/validationRules';

export interface Validatorable {
  validate(validations: ValidationRule[]): ValidationError[];
}
