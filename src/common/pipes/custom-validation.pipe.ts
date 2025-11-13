/* Nest.js imports */
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
/*
CustomValidationPipe

Essa instância de ValidationPipe foi construída de forma retornar uma string que
concatena os erros de validação detectados. Desejamos que esses erros sejam conca-
tenados em uma string para manter o padrão de exceções construídas pelo
HttpExceptionFilter, independentemente da exceção ser levantada diretamente por
new HttpException() ou pelo processo de validação.
*/
export const CustomValidationPipe = new ValidationPipe({
  exceptionFactory: (validationErrors) => {
    const validationException = validationErrors.map((validationError) => {
      return typeof validationError.constraints === "object"
        ? Object.values(validationError.constraints).join(", ")
        : validationError.constraints;
    });
    return new HttpException(
      validationException.join(", "),
      HttpStatus.BAD_REQUEST,
    );
  },
});
