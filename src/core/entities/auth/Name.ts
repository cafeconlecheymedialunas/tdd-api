import { ValidationException } from "../../errors";
import { hasCorrectMaxLength, isEmail, isNotEmpty, isString } from "./validaciones";
import { MESSAGES } from "../../types/validationRules";

export class Name
{
    private value!:string

    constructor(value:string)
    {
        this.setValue(value);
    }

    public setValue(value:string): void
    {
        this.value = value;
        this.ensureIsValid(value);
    }

    public getValue(){
        return this.value;
    }
    private ensureIsValid(value:string)
    {
        if (isNotEmpty(value)) {
            throw new ValidationException([{key:"route","error":MESSAGES.isNotEmpty}])
        }
        if(!isString(value)){
            throw new ValidationException([{key:"route","error":MESSAGES.isString}])
        }
        if(!hasCorrectMaxLength(value,50)){
            throw new ValidationException([{key:"route","error":MESSAGES.max}])
        }
    }
}