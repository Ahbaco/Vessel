import { Module } from "@nestjs/common";
import { RmqModule, RmqQueues, RmqServices } from "@vessel/common";
import { EnvModule } from "@vessel/config";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

@Module({
  imports: [EnvModule, RmqModule.register({ name: RmqServices.Auth, queue: RmqQueues.Auth })],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
