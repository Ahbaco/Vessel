import { Module } from "@nestjs/common";
import { JwtModule } from "@vessel/common/modules";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common/rmq";
import { DatabaseModule } from "@vessel/database/database.module";
import { TokenModule, UserModule } from "@vessel/database/repositories";
import { LoggerModule } from "@vessel/logger";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    LoggerModule,
    RmqModule.register({ name: RmqServices.Notification, queue: RmqQueues.Notification }),
    JwtModule,
    DatabaseModule,
    RmqModule,
    UserModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
