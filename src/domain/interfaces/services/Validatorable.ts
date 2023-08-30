import { ValidationError } from '#src/domain/types/errors';
import { ValidationRule } from '#src/domain/types/validationRules';

export interface Validatorable {
  validate(validations: ValidationRule[]): ValidationError[];
}
