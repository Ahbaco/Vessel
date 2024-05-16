import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { NotificationEvent } from "@vessel/common/enums";
import { MailService } from "./mail.service";

@Controller()
export class MailController {
  constructor(private mailService: MailService) {}

  @EventPattern(NotificationEvent.SendTempPassword)
  async sendTempPasswordMail(@Payload() data: { email: string; password: string }) {
    await this.mailService.sendTempPasswordMail(data.email, data.password);
  }
}
