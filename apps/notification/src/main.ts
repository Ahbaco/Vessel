import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { RmqQueues, RmqService } from "@vessel/common/rmq";
import { NotificationModule } from "./notification.module";

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  // Configure RMQ microservice
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmq.getOptions(RmqQueues.Notification, true));
  // Start all microservices
  await app.startAllMicroservices();
}
bootstrap();
