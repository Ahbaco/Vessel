import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("smtp.host"),
          port: config.get("smtp.port"),
          ignoreTLS: config.get("smtp.ignoreTLS"),
          secure: config.get("smtp.secure"),
          pool: true,
          auth: {
            type: "login",
            user: config.get("smtp.user") || "",
            pass: config.get("smtp.password") || "",
          },
        },
        defaults: {
          from: `"${config.get("smtp.senderName")}" <${config.get("smtp.emailFrom")}>`,
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
