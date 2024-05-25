import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { RmqQueues, RmqService } from "@vessel/common/rmq";
import { AdminModule } from "./admin.module";

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  // Configure RMQ microservice
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmq.getOptions(RmqQueues.Admin, true));
  // Start all microservices
  await app.startAllMicroservices();
}

bootstrap();
