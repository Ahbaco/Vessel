import { Module } from "@nestjs/common";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common/rmq";
import { LoggerModule } from "@vessel/logger";
import { AuthController } from "./auth/auth.controller";
import { LocalStrategy } from "./auth/strategies/local.strategy";

@Module({
  imports: [LoggerModule, RmqModule.register({ name: RmqServices.Auth, queue: RmqQueues.Auth })],
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class ApiModule {}
