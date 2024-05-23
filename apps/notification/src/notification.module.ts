import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { EnvModule } from "@vessel/config";
import { LoggerModule } from "@vessel/logger";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [LoggerModule, EnvModule, RmqModule, MailModule],
  controllers: [],
  providers: [],
})
export class NotificationModule {}
