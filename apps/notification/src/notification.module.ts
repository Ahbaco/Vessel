import { Module } from "@nestjs/common";
import { RmqModule } from "@vessel/common/rmq";
import { EnvModule } from "@vessel/config";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [EnvModule, RmqModule, MailModule],
  controllers: [],
  providers: [],
})
export class NotificationModule {}
