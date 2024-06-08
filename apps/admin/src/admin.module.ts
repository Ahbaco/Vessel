import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { MasterDatabaseModule } from "@vessel/database/modules";
import { LoggerModule } from "@vessel/logger";

@Module({
  imports: [LoggerModule, RmqModule, MasterDatabaseModule],
})
export class AdminModule {}
