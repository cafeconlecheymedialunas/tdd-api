export const Rules = {
  isNotEmpty: 'isNotEmpty',
  isString: 'isString',
  isNumber: 'isNumber',
  isBoolean: 'isBoolean',
  min: 'min',
  max: 'max',
  isEmail: 'isEmail',
  isStrongPassword: 'isStrongPassword',
} as const;

export type RuleTypes = (typeof Rules)[keyof typeof Rules];

export type ValidationRule = {
  key: string;
  rules: RuleTypes[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};
