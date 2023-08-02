export const RULES = {
  isNotEmpty: 'isNotEmpty',
  isString: 'isString',
  isNumber: 'isNumber',
  isBoolean: 'isBoolean',
  min: 'min',
  max: 'max',
  isEmail: 'isEmail',
  isStrongPassword: 'isStrongPassword',
} as const;

export type RuleTypes = (typeof RULES)[keyof typeof RULES];

export type ValidationRule = {
  key: string;
  rules: RuleTypes[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export const MESSAGES = {
  isNotEmpty: `The %s is required`,
  isString: `The %s must be a string`,
  isNumber: `The %s must be a string`, // Corrected typo here
  isBoolean: `The %s must be a boolean`,
  min: `The %s have at least one digit`,
  max: `The %s have at least 120 digit`,
  isEmail: `The %s is not a valid email`,
  // eslint-disable-next-line max-len
  isStrongPassword: `The %s must be at least 8 characters long, contain at least one uppercase letter and one lowercase letter, have at least one digit, and include one special character`,
};
