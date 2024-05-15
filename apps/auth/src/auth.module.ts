import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { EnvModule } from "@vessel/config";
import { DatabaseModule } from "@vessel/database";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [EnvModule, DatabaseModule, RmqModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
