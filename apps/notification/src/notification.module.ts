import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { LoggerModule } from "@vessel/logger";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [LoggerModule, RmqModule, MailModule],
  controllers: [],
  providers: [],
})
export class NotificationModule {}
