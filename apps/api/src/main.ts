import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { RmqQueues, RmqService } from "@vessel/common";
import { ApiModule } from "./api.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  // Configure RMQ microservice
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmq.getOptions(RmqQueues.Api, true));
  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe());
  // Config Service
  const config = app.get(ConfigService);

  await app.startAllMicroservices();
  await app.listen(config.get("api.port") as number);
}
bootstrap();
