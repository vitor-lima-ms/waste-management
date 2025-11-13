/* Nest.js imports */
import { Global, Module } from "@nestjs/common";
/* Service imports */
import { MessagesUtilsService } from "./providers/messages-utils.service";
/* MessagesUtilsModule */
@Global()
@Module({
  exports: [MessagesUtilsService],
  providers: [MessagesUtilsService],
})
export class MessagesUtilsModule {}
