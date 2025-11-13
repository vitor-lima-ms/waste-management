/* Nest.js imports */
import { HttpException, HttpStatus } from "@nestjs/common";
/* BadRequestException */
export class BadRequestException extends HttpException {
  constructor() {
    super("Bad Request.", HttpStatus.BAD_REQUEST);
  }
}
