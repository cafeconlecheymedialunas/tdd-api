import { ValidationException } from "../../errors";
import { isNotEmpty, isStrongPassword } from "./validaciones";
import { MESSAGES } from "../../types/validationRules";

export class Password
{
    private value!:string

    constructor(value:string)
    {
        this.setValue(value);
    }
    public setValue(value:string): void
    {
        this.ensureIsValid(value)
        this.value = value;
    }

    public getValue(){
        return this.value;
    }

    private ensureIsValid(value:string)
    {
        if (!isNotEmpty(value)) {
            throw new ValidationException([{ key: 'password', error: MESSAGES.isNotEmpty }]);
          }
          if (!isStrongPassword(value)) {
            throw new ValidationException([{ key: 'password', error: MESSAGES.isStrongPassword }]);
          }
    }
}