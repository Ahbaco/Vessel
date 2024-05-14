import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common";
import { EnvModule } from "@vessel/config";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

@Module({
  imports: [EnvModule, RmqModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
