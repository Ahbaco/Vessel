import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { ApiModule } from "./api.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, { bufferLogs: true });
  // Configure Pino logger
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe());
  // Config Service
  const config = app.get(ConfigService);
  // Setup Swagger
  const swagger = new DocumentBuilder()
    .setTitle(config.get("app.name") || "My Docs")
    .setDescription("Tenancy Backend")
    .setVersion("0.1")
    .addSecurity("bearer", {
      type: "http",
      scheme: "bearer",
    })
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup("docs", app, document, {
    jsonDocumentUrl: "/docs.json",
  });
  await app.listen(config.get("api.port") as number);
}
bootstrap();
