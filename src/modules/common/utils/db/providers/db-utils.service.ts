/* Enum imports */
import { SqlAggregateFunctionsEnum } from "../enums/sql-aggregate-functions.enum";
import { SqlDataTypesEnum } from "../enums/sql-data-types.enum";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* DbUtilsService */
@Injectable()
export class DbUtilsService {
  /**
   * @param aggFunc Identificação da função de agregação
   * @param propertyName Propriedade a ser agregada
   * @param distinct Utilizado caso o COUNT precise contabilizar linhas sem repetição de valores
   * do atributo
   * @returns String que combina aggFunc, distinct e propertyName
   */
  generateAggregateFunction(
    aggFunc: SqlAggregateFunctionsEnum,
    propertyName: string,
    distinct?: boolean,
  ): string {
    switch (aggFunc) {
      case SqlAggregateFunctionsEnum.AVG:
        return `${SqlAggregateFunctionsEnum.AVG}(${propertyName})`;
      case SqlAggregateFunctionsEnum.COUNT:
        return `${SqlAggregateFunctionsEnum.COUNT}(${distinct ? "DISTINCT " : ""}${propertyName})`;
      case SqlAggregateFunctionsEnum.MAX:
        return `${SqlAggregateFunctionsEnum.MAX}(${propertyName})`;
      case SqlAggregateFunctionsEnum.MIN:
        return `${SqlAggregateFunctionsEnum.MIN}(${propertyName})`;
      case SqlAggregateFunctionsEnum.SUM:
        return `${SqlAggregateFunctionsEnum.SUM}(${propertyName})`;
    }
  }
  /**
   * @param columnAlias Apelido a ser usado para a coluna
   * @returns Apelido entre aspas duplas
   */
  generateColumnAliasForSelectQuery(columnAlias: string): string {
    return `"${columnAlias}"`;
  }
  /**
   * @param sqlDataType Tipo de dado de destino da conversão
   * @returns String de conversão
   */
  generatePostgreSqlDoubleColonOperator(
    sqlDataType: SqlDataTypesEnum | undefined,
  ): string {
    if (sqlDataType) {
      return `::${sqlDataType}`;
    }
    return "";
  }
  /**
   * @param entity Entidade para a qual será gerada a string correspondente
   * @returns String que representa a entidade
   */
  generateEntityToStringForInnerJoinQuery(entity: Function): string {
    return `${entity.toString().split(" ")[1].split("{")[0]}`;
  }
}
