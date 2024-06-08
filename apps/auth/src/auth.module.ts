import { Module } from "@nestjs/common";
import { JwtModule } from "@vessel/common/modules";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common/rmq";
import { MasterDatabaseModule } from "@vessel/database/modules";
import { LoggerModule } from "@vessel/logger";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    LoggerModule,
    RmqModule.register({ name: RmqServices.Notification, queue: RmqQueues.Notification }),
    JwtModule,
    MasterDatabaseModule,
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
