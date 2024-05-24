import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { NotificationEvent } from "@vessel/common/enums";
import { SendTempPasswordEmail } from "@vessel/common/interfaces";
import { PinoLogger } from "nestjs-pino";
import { MailService } from "./mail.service";

@Controller()
export class MailController {
  constructor(
    private mailService: MailService,
    private logger: PinoLogger,
  ) {}

  @EventPattern(NotificationEvent.SendTempPassword)
  async sendTempPasswordMail(@Payload() data: SendTempPasswordEmail, @Ctx() ctx: RmqContext) {
    this.logger.info(`${ctx.getPattern()} - Sending temp password email 1`);
    try {
      await this.mailService.sendTempPasswordMail(data);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
