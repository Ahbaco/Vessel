import { Module } from "@nestjs/common";
import { EnvModule } from "@vessel/config";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";

@Module({
  imports: [EnvModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
