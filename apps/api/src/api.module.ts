import { Module } from "@nestjs/common";
import { JwtModule } from "@vessel/common/modules";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common/rmq";
import { LoggerModule } from "@vessel/logger";
import { AuthController } from "./auth/auth.controller";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { LocalStrategy } from "./auth/strategies/local.strategy";

@Module({
  imports: [
    LoggerModule,
    RmqModule.register({ name: RmqServices.Auth, queue: RmqQueues.Auth }),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class ApiModule {}
