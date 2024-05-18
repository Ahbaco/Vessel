import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { NotificationEvent } from "@vessel/common/enums";
import { SendTempPasswordEmail } from "@vessel/common/interfaces";
import { MailService } from "./mail.service";

@Controller()
export class MailController {
  constructor(private mailService: MailService) {}

  @EventPattern(NotificationEvent.SendTempPassword)
  async sendTempPasswordMail(@Payload() data: SendTempPasswordEmail) {
    await this.mailService.sendTempPasswordMail(data);
  }
}
