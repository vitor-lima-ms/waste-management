/* Nest.js imports */
import { HttpException, HttpStatus, ParseIntPipe } from "@nestjs/common";
/*
CustomParseIntPipe

Essa instância de ParseIntPipe foi construída de forma retornar uma mensagem padroni-
zada de erro, de modo a manter o padrão retornado pelo HttpExceptionFilter.
*/
export const CustomParseIntPipe = new ParseIntPipe({
  exceptionFactory: () => {
    return new HttpException(
      "Falha na transformação! O parâmetro recebido não pode ser convertido para um número inteiro",
      HttpStatus.BAD_REQUEST,
    );
  },
});
