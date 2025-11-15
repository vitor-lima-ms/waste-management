/* Filter imports */
import { HttpExceptionFilter } from "./common/exceptions/filters/http-exception.filter";
/* Interceptor imports */
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
/* Module imports */
import { DbUtilsModule } from "./modules/common/utils/db/db-utils.module";
import { DisposalPointsModule } from "./modules/disposal-points/dp.module";
import { MessagesUtilsModule } from "./modules/common/utils/messages/messages-utils.module";
import { StringUtilsModule } from "./modules/common/utils/string/string-utils.module";
import { UsersModule } from "./modules/users/us.module";
import { WastesModule } from "./modules/wastes/wt.module";
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
    DbUtilsModule,
    DisposalPointsModule,
    MessagesUtilsModule,
    StringUtilsModule,
    /* ORM module */
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      logging: true,
      synchronize: process.env.NODE_ENV === "development" ? false : false,
      type: "postgres",
      url:
        process.env.NODE_ENV === "development" ? process.env.POSTGRES_URL : "",
    }),
    UsersModule,
    WastesModule,
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
