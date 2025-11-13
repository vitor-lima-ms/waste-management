/* Nest.js imports */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
/* Other libraries imports */
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
/* Response<T> interface */
export interface Response<T> {
  count: number;
  data: T[];
}
/* TransformInterceptor */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const dataArray: T[] = [];
        if (!Array.isArray(data)) {
          dataArray.push(data);
        }
        return {
          count: Array.isArray(data) ? data.length : dataArray.length,
          data: Array.isArray(data) ? data : dataArray,
        };
      }),
    );
  }
}
