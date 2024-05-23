import { Module } from "@nestjs/common";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common/rmq";
import { EnvModule } from "@vessel/config";
import { DatabaseModule } from "@vessel/database/database.module";
import { UserModule } from "@vessel/database/repositories";
import { LoggerModule } from "@vessel/logger";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    LoggerModule,
    EnvModule,
    DatabaseModule,
    RmqModule,
    UserModule,
    RmqModule.register({ name: RmqServices.Notification, queue: RmqQueues.Notification }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
