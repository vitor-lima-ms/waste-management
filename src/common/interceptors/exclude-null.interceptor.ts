/* Nest.js imports */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
/* Other libraries imports */
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
/* ExcludeNullInterceptor */
@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((value) => (value === null ? "" : value)));
  }
}
