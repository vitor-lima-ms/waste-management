/* Nest.js imports */
import { Global, Module } from "@nestjs/common";
/* Service imports */
import { DbUtilsService } from "./providers/db-utils.service";
/* DbUtilsModule */
@Global()
@Module({
  exports: [DbUtilsService],
  providers: [DbUtilsService],
})
export class DbUtilsModule {}
