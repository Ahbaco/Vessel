import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApiModule } from "./api.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
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

  Logger.log(`Server running on http://localhost:${config.get("api.port")}`);
  Logger.log(`Swagger docs at http://localhost:${config.get("api.port")}/docs`);
}
bootstrap();
