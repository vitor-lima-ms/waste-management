/* Other libraries imports */
import { IsStrongPasswordOptions } from "class-validator";
/* ClassValidatorAditionalValidationsType */
export type ClassValidatorAditionalValidationsType = {
  enumValues?: Record<string, number | string>;
  strongPasswordOptions?: IsStrongPasswordOptions;
};
