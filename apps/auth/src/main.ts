import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { RmqQueues, RmqService } from "@vessel/common/rmq";
import { AuthModule } from "./auth.module";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // Configure RMQ microservice
  const rmq = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmq.getOptions(RmqQueues.Auth, true));
  // Start all microservices
  await app.startAllMicroservices();
}
bootstrap();
