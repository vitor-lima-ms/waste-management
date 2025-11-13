/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* DbUtilsService */
@Injectable()
export class DbUtilsService {
  /**
   *
   * @param columnAlias Apelido a ser usado para a coluna
   * @returns Apelido entre aspas duplas
   */
  generateColumnAliasForSelectQuery(columnAlias: string): string {
    return `"${columnAlias}"`;
  }
  /**
   *
   * @param entity Entidade para a qual será gerada a string correspondente
   * @returns String que representa a entidade
   */
  generateEntityToStringForInnerJoinQuery(entity: Function): string {
    return `${entity.toString().split(" ")[1].split("{")[0]}`;
  }
}
