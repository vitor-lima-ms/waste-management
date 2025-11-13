/* Entity imports */
import { EntitiesPtBrNamesEnum } from "src/common/enums/entities-ptbr-names.enum";
/* Enum imports */
import { CreateUpdateAndDeleteEnum } from "../enums/cud.enum";
import { HttpExceptionMessageContextsEnum } from "../enums/http-exception-message-contexts.enum";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* MessagesUtilsService */
@Injectable()
export class MessagesUtilsService {
  /**
   *
   * @param cudOperation Parâmetro que representa uma das três possíveis operações
   * (i.e., create, update ou delete)
   * @param entityIdentifier Identificação da entidade de acordo com o EntitiesPtBrNamesEnum
   * @returns Uma mensagem de sucesso de acordo com os argumentos enviados
   */
  generateCudSuccessMessage(
    cudOperation: CreateUpdateAndDeleteEnum,
    entityIdentifier: EntitiesPtBrNamesEnum,
  ): string {
    const lowercasedEntityIdentifier = entityIdentifier.toLowerCase();
    switch (cudOperation) {
      case CreateUpdateAndDeleteEnum.CREATE:
        return `Instância de ${lowercasedEntityIdentifier} criada com sucesso.`;
      case CreateUpdateAndDeleteEnum.DELETE:
        return `Instância de ${lowercasedEntityIdentifier} apagada com sucesso.`;
      case CreateUpdateAndDeleteEnum.UPDATE:
        return `Instância de ${lowercasedEntityIdentifier} atualizada com sucesso.`;
    }
  }
  /**
   *
   * @param exceptionContext Representa a situação que irá gerar a HttpException
   * @param entityIdentifier Identificação da entidade de acordo com o EntitiesPtBrNamesEnum
   * @param propertiesNames Nome das propriedades relacionadas à exceção, de acordo com
   * o enum que compila o nome das propriedades, em pt-br, de cada entidade
   * @returns Uma mensagem de exceção de acordo com os argumentos enviados
   */
  generateHttpExceptionErrorMessage(
    entityIdentifier: EntitiesPtBrNamesEnum,
    exceptionContext: HttpExceptionMessageContextsEnum,
    propertiesNames?: string[],
  ): string {
    const lowercasedEntityIdentifier = entityIdentifier.toLowerCase();
    let notUndefinedFlag = false;
    let propertyNameLength = 0;
    let lowercasedPropertyName = "";
    let lowercasedPropertiesNames = "";
    if (propertiesNames) {
      notUndefinedFlag = true;
      propertyNameLength = propertiesNames.length;
      if (propertyNameLength > 1) {
        const lastPropertyName = propertiesNames.pop();
        const arrayWithoutLastPropertyName = propertiesNames?.filter(
          (value) => value !== lastPropertyName,
        );
        lowercasedPropertiesNames = `${arrayWithoutLastPropertyName.join(", ")} e ${lastPropertyName}`;
      } else {
        [lowercasedPropertyName] = propertiesNames;
      }
    }
    switch (exceptionContext) {
      case HttpExceptionMessageContextsEnum.CONFIRM_PASSWORD_ERROR:
        return "A confirmação de senha não é igual à senha enviada";
      case HttpExceptionMessageContextsEnum.MISSING_DATA:
        return `Impossível realizar ação! Dados faltantes: ${lowercasedPropertiesNames}`;
      case HttpExceptionMessageContextsEnum.NOT_FOUND:
        return `Instância de ${lowercasedEntityIdentifier} não encontrada`;
      case HttpExceptionMessageContextsEnum.UNIQUE_ERROR:
        return `Já existe ${lowercasedEntityIdentifier} com o mesmo valor de: ${notUndefinedFlag ? (propertyNameLength > 1 ? lowercasedPropertiesNames.toLowerCase() : lowercasedPropertyName.toLowerCase()) : undefined}`;
      case HttpExceptionMessageContextsEnum.UUID_ERROR:
        return "O valor enviado como parâmetro é um uuid inválido";
    }
  }
}
