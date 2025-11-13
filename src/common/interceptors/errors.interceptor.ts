/* Nest.js imports */
import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
/* Other libraries imports */
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
/* ErrorsInterceptor */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((error) => throwError(() => new BadGatewayException())));
  }
}
