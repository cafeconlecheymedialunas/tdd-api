import { ValidationError } from '#root/domain/types/errors';
import { ValidationRule } from '#root/domain/types/validationRules';

export interface Validatorable {
  validate(validations: ValidationRule[]): ValidationError[];
}
