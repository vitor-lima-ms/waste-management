/* Nest.js imports */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
/* Other libraries imports */
import { Request, Response } from "express";
/* HttpExceptionFilter */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let details = exception.getResponse() as
      | string
      | {
          message: string;
          error: string;
          statusCode: number;
        };
    if (typeof details === "string") {
      details = details.endsWith(".") ? details : details.concat(".");
    } else {
      details = details.message;
    }
    res.status(status).json({
      details: details,
      path: req.url,
      statusCode: status,
      statusMessage: HttpStatus[status].replace("_", " ").concat("!"),
      timestamp: {
        date: new Date().toLocaleDateString("pt-br"),
        time: new Date().toLocaleTimeString("pt-br"),
      },
    });
  }
}
