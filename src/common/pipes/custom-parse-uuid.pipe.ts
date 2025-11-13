/* Nest.js imports */
import { HttpException, HttpStatus, ParseUUIDPipe } from "@nestjs/common";
/*
CustomParseUUIDPipe

Essa instância de ParseUUIDPipe foi construída de forma retornar uma mensagem padroni-
zada de erro, de modo a manter o padrão retornado pelo HttpExceptionFilter.
*/
export const CustomParseUUIDPipe = new ParseUUIDPipe({
  exceptionFactory: () => {
    return new HttpException(
      "O parâmetro recebido não é um UUID válido",
      HttpStatus.BAD_REQUEST,
    );
  },
});
