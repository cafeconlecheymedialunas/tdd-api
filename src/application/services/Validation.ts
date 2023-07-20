import { ValidationError } from "../../domain/types/response"


  
export class Validation{
    messages = []
    errors:ValidationError[] = []

    static isNotEmpty=(value:any):boolean=> {
        return value && value !== ""
    }
    static isString=(value: any):boolean=> {
        return typeof value === "string";
    }
    
    static isNumber=(value: any): boolean=>{
        return typeof value === "number"
    }
    
    static isBoolean= (value: any):boolean =>{
        return typeof value === "boolean";
    }

    static min = (min: number, actual: number):boolean => actual >= min;

    static max = (max: number, actual: number):boolean => actual <= max;

    static isEmail = (value:string):boolean=>{
        const regex = /\S+@\S+\.\S+/;

        return regex.test(value);
    }

    static isStrongPassword(value:string):boolean {
        const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        return regex.test(value)
    }
}