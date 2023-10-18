import { ValidationException } from '../../errors';
import { MESSAGES } from '../../types/validationRules';

export class Method {
    private value!: string;
    private enabledMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    constructor(value: string) {
        this.setValue(value);
    }
    public setValue(value: string): void {
        this.ensureIsValid(value)
        this.value = value;
    }

    public getValue() {
        return this.value;
    }
    private ensureIsValid(value: string) {

        if (value === '') {
            throw new ValidationException([{ key: 'method', error: MESSAGES.isEmail }]);
        }


        if (!this.enabledMethods.includes(value)) {
            throw new ValidationException([{ key: 'method', error: 'No esta incluido' }]);
        }
    }
}
