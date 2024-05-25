import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { DatabaseModule } from "@vessel/database/database.module";
import { LoggerModule } from "@vessel/logger";
import { UserModule } from "./users/user.module";

@Module({
  imports: [LoggerModule, RmqModule, DatabaseModule, UserModule],
})
export class AdminModule {}
