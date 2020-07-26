import { LengthValidation, SimpleValidation } from "./types";

export const REGEX = {
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  NUMBER: /\d/,
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/
};

export const validators: {
  [key: string]: SimpleValidation | LengthValidation;
} = {
  required: (v: string): boolean => !!v,

  maxlength: (length: number): ((v: string) => boolean) => (v: string) =>
    !v || (!!v && v.length <= length),

  minlength: (length: number): ((v: string) => boolean) => (v: string) =>
    !v || (!!v && v.length >= length),

  validEmail: (v: string): boolean => !v || REGEX.EMAIL.test(v),

  numberRequired: (v: string): boolean => !v || REGEX.NUMBER.test(v),

  uppercaseRequired: (v: string): boolean => !v || REGEX.UPPERCASE.test(v),

  lowercaseRequired: (v: string): boolean => !v || REGEX.LOWERCASE.test(v)
};
