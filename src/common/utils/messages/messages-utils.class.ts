/* Enum imports */
import { ClassValidatorDecoratorsNamesEnum } from "./enums/class-validator-decorators-names.enum";
import { DbConstraintsEnum } from "src/common/enums/db-constraints.enum";
/* Type imports */
import type { ClassValidatorAditionalValidationsType } from "./types/class-validator-aditional-validations";
/* ErrorMessagesUtilsClass */
export class MessagesUtilsClass {
  /**
   *
   * @param propertyName Nome da propriedade que está sendo decorada. Utilize o enum
   * que compila o nome, em pt-br, das propriedades de cada entidade
   * @param decoratorName Nome do decorador dentro do qual a função está sendo utilizada
   * @param aditionalValidations Objeto que apresenta opções específicas de alguns
   * decoradores
   * @returns Uma mensagem de erro padronizada de acordo com propertyName e decoratorName
   */
  static generateClassValidatorErrorMessage(
    propertyName: string,
    decoratorName: ClassValidatorDecoratorsNamesEnum,
    aditionalValidations?: ClassValidatorAditionalValidationsType,
  ): string {
    const lowercasedPropertyName = propertyName.toLowerCase();
    const enumValues = aditionalValidations?.enumValues
      ? Object.values(aditionalValidations.enumValues).join(", ")
      : undefined;
    const strongPasswordOptions = aditionalValidations?.strongPasswordOptions;
    switch (decoratorName) {
      case ClassValidatorDecoratorsNamesEnum.IS_DATE_STRING:
        return `O campo ${lowercasedPropertyName} deve ser preenchido com uma data no formato AAAA-MM-DD`;
      case ClassValidatorDecoratorsNamesEnum.IS_EMAIL:
        return `O campo ${lowercasedPropertyName} deve ser preenchido com um e-mail válido`;
      case ClassValidatorDecoratorsNamesEnum.IS_ENUM:
        return `O campo ${lowercasedPropertyName} deve ser um dos seguintes valores: ${enumValues}`;
      case ClassValidatorDecoratorsNamesEnum.IS_INT:
        return `O campo ${lowercasedPropertyName} deve ser preenchido com um número inteiro`;
      case ClassValidatorDecoratorsNamesEnum.IS_NOT_EMPTY:
        return `O campo ${lowercasedPropertyName} deve ser enviado`;
      case ClassValidatorDecoratorsNamesEnum.IS_NUMBER:
        return `O campo ${lowercasedPropertyName} deve ser preenchido com um número`;
      case ClassValidatorDecoratorsNamesEnum.IS_STRONG_PASSWORD:
        return `O campo ${lowercasedPropertyName} não atende à um ou mais dos seguintes requisitos:\n\tTamanho mínimo: ${strongPasswordOptions?.minLength};\n\tQuantidade mínima de letras minúsculas: ${strongPasswordOptions?.minLowercase};\n\tQuantidade mínima de números: ${strongPasswordOptions?.minNumbers};\n\tQuantidade mínima de símbolos: ${strongPasswordOptions?.minSymbols};\n\tQuantidade mínima de letras maiúsculas: ${strongPasswordOptions?.minUppercase}`;
      case ClassValidatorDecoratorsNamesEnum.IS_UUID:
        return `O campo ${lowercasedPropertyName} deve ser preenchido com um UUID`;
    }
  }
  /**
   *
   * @param constraint Identificação da restrição
   * @param dbProperties Propriedades do banco de dados que compõe a restrição
   * @returns Nome da restrição
   */
  static generateDbConstraintsNames(
    constraint: DbConstraintsEnum,
    dbProperties: string[],
  ): string {
    return `${constraint}_${dbProperties.join("_")}`;
  }
}
