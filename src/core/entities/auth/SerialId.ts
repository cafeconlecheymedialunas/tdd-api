import { ValidationException } from "../../errors";
import { hasCorrectMaxLength, isEmail, isNotEmpty, isNumber, isSerial, isString } from "./validaciones";
import { MESSAGES } from "../../types/validationRules";

export class SerialId
{
    private value!:number

    constructor(value:number)
    {
        this.setValue(value);
    }

    public setValue(value:number): void
    {
        this.value = value;
        this.ensureIsValid(value);
    }

    public getValue(){
        return this.value;
    }
    private ensureIsValid(value:number)
    {
        if (isNotEmpty(value)) {
            throw new ValidationException([{key:"route","error":MESSAGES.isNotEmpty}])
        }
        if(!isNumber(value)){
            throw new ValidationException([{key:"route","error":MESSAGES.isNumber}])
        }
        if(!isSerial(value)){
            throw new ValidationException([{key:"route","error":MESSAGES.isSerial}])
        }
    }
}