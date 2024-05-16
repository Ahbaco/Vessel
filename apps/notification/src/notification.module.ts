import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { EnvModule } from "@vessel/config";

@Module({
  imports: [EnvModule, RmqModule],
  controllers: [],
  providers: [],
})
export class NotificationModule {}
