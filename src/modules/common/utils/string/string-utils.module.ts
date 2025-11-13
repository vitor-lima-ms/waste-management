/* Nest.js imports */
import { Global, Module } from "@nestjs/common";
/* Service imports */
import { StringUtilsService } from "./providers/string-utils.service";
/* StringUtilsModule */
@Global()
@Module({
  exports: [StringUtilsService],
  providers: [StringUtilsService],
})
export class StringUtilsModule {}
