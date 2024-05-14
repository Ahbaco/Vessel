import { Module } from "@nestjs/common";
import { RmqModule, RmqQueues } from "@vessel/common";
import { EnvModule } from "@vessel/config";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

@Module({
  imports: [EnvModule, RmqModule.register({ name: RmqQueues.Api })],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
