import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { RmqQueues, RmqService } from "@vessel/common/rmq";
import { Logger } from "nestjs-pino";
import { AuthModule } from "./auth.module";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // Configure Pino logger
  app.useLogger(app.get(Logger));
  // Configure RMQ microservice
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmq.getOptions(RmqQueues.Auth, true));

  await app.startAllMicroservices();
}
bootstrap();
