import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { NotificationEvent } from "@vessel/common/enums";
import { SendTempPasswordEmail } from "@vessel/common/interfaces";
import { RmqService } from "@vessel/common/rmq";
import { MailService } from "./mail.service";

@Controller()
export class MailController {
  constructor(
    private mailService: MailService,
    private rmqService: RmqService,
  ) {}

  @EventPattern(NotificationEvent.SendTempPassword)
  async sendTempPasswordMail(@Payload() data: SendTempPasswordEmail, @Ctx() ctx: RmqContext) {
    try {
      await this.mailService.sendTempPasswordMail(data);
      this.rmqService.ack(ctx);
    } catch (_e) {
      // TODO: Log error
      // TODO: Config RMQ to retry with a limit
    }
  }
}
