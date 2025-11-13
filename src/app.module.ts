/* Filter imports */
import { HttpExceptionFilter } from "./common/exceptions/filters/http-exception.filter";
/* Interceptor imports */
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
/* Module imports */
/* Nest.js imports */
import { APP_FILTER } from "@nestjs/core";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
/* App module */
@Module({
  imports: [
    /* Config module */
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
    }),
    /* ORM module */
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === "development" ? true : false,
      type: "postgres",
      url:
        process.env.NODE_ENV === "development" ? process.env.POSTGRES_URL : "",
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
