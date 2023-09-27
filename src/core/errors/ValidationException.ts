import ClientException from './ClientException';
import { ValidationError } from 'core/types/validationRules';

export default class ValidationException extends ClientException {
  constructor(errors: ValidationError[]) {
    super(422, `There are ${errors.length} validation error${errors.length > 1 ? 's' : ''}`, errors);
  }
}
