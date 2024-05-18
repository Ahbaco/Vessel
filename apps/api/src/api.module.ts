import { Module } from "@nestjs/common";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common/rmq";
import { EnvModule } from "@vessel/config";
import { AuthController } from "./auth/auth.controller";

@Module({
  imports: [EnvModule, RmqModule.register({ name: RmqServices.Auth, queue: RmqQueues.Auth })],
  controllers: [AuthController],
})
export class ApiModule {}
