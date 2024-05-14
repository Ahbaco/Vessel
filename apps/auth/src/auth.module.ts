import { Module } from "@nestjs/common";
import { RmqModule, RmqQueues } from "@vessel/common";
import { EnvModule } from "@vessel/config";
import { DatabaseModule } from "@vessel/database";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [EnvModule, DatabaseModule, RmqModule.register({ name: RmqQueues.Auth })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
