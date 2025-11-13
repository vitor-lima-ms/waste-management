// Nest.js imports
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
// Module imports
import { AppModule } from "./app.module";
// Entry point
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT") ?? 3000);
}
bootstrap();
