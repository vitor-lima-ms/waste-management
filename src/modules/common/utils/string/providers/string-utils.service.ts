/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* StringUtilsService */
@Injectable()
export class StringUtilsService {
  /**
   *
   * @param string_
   * @returns A string passada como argumento sem espaços em branco além daqueles
   * que separam as letras/palavras/símbolos etc.
   */
  trimAndRemoveExtraBlankSpacesBetweenChars(string_: string): string {
    const splitedString = string_.split(" ");
    const trimmedStringWithoutExtraBlankSpaces = splitedString
      .filter((char) => char !== "")
      .join(" ");
    return trimmedStringWithoutExtraBlankSpaces;
  }
}
