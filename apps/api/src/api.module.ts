import { Module } from "@nestjs/common";
import { LocalizationModule, RmqModule, RmqQueues, RmqServices } from "@vessel/common";
import { EnvModule } from "@vessel/config";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

@Module({
  imports: [
    LocalizationModule,
    EnvModule,
    RmqModule.register({ name: RmqServices.Auth, queue: RmqQueues.Auth }),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
