import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { render } from "@react-email/components";
import { SendTempPasswordEmail } from "@vessel/common/interfaces";
import TempPassword from "./templates/temp-password";

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendTempPasswordMail(data: SendTempPasswordEmail) {
    const html = render(TempPassword({ password: data.password }));

    const payload: ISendMailOptions = {
      to: data.email,
      subject: "Tu password temporal",
      html,
    };

    await this.mailer.sendMail(payload);
  }
}
