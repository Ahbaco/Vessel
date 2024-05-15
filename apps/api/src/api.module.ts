import { Module } from "@nestjs/common";
import { LocalizationModule, RmqModule, RmqQueues, RmqServices } from "@vessel/common";
import { EnvModule } from "@vessel/config";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [
    LocalizationModule,
    EnvModule,
    RmqModule.register({ name: RmqServices.Auth, queue: RmqQueues.Auth }),
  ],
  controllers: [AuthController],
})
export class ApiModule {}
