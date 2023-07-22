export const Rules = {
  isNotEmpty: 'isNotEmpty',
  isString: 'isString',
  isNumber: 'isNumber', // Corrected typo here
  isBoolean: 'isBoolean',
  min: 'min',
  max: 'max',
  isEmail: 'isEmail',
  isStrongPassword: 'isStrongPassword',
} as const;

export const Messages = {
  isNotEmpty: 'required',
  isString: 'isString',
  isNumber: 'isNumber', // Corrected typo here
  isBoolean: 'isBoolean',
  min: 'min',
  max: 'max',
  isEmail: 'isEmail',
  isStrongPassword: 'isStrongPassword',
} as const;

export type RuleTypes = (typeof Rules)[keyof typeof Rules];
export type MessageTypes = (typeof Messages)[keyof typeof Messages];
export type ValidationRule = {
  key: string;
  rules: RuleTypes[];
  value: any;
};
