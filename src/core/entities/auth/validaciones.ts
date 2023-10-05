import { ValidationException } from '../../errors';
import { MESSAGES } from '../../types/validationRules';

const isNotEmpty = (value: string | number): boolean => {
  return value.toString().trim().length === 0;
};

const isString = (value: unknown): boolean => typeof value === 'string';

const isNumber = (value: unknown): boolean => typeof value === 'number';

const isBoolean = (value: unknown): boolean => typeof value === 'boolean';

const hasCorrectMinLength = (value: string, min: number): boolean => {
  return value.toString().trim().length >= min;
};

const isSerial = (value: number) => {
  return isNumber(value) && value > 0 && value < 2147483648;
};

const hasCorrectMaxLength = (value: string, max: number): boolean => {
  return value.toString().trim().length <= max;
};

const isEmail = (value: string): boolean => {
  const regex = /\S+@\S+\.\S+/;

  return regex.test(value);
};

const isStrongPassword = (value: string): boolean => {
  const regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

  return regex.test(value);
};

export {
  isSerial,
  isNotEmpty,
  isString,
  isBoolean,
  isNumber,
  hasCorrectMinLength,
  hasCorrectMaxLength,
  isEmail,
  isStrongPassword,
};
