import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { RmqQueues, RmqService } from "@vessel/common/rmq";
import { Logger } from "nestjs-pino";
import { NotificationModule } from "./notification.module";

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  // Configure Pino logger
  app.useLogger(app.get(Logger));
  // Configure RMQ microservice
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmq.getOptions(RmqQueues.Notification, true));

  await app.startAllMicroservices();
}
bootstrap();
