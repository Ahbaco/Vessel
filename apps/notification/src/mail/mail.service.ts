import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { render } from "@react-email/components";
import TempPassword from "./templates/temp-password";

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendTempPasswordMail(email: string, password: string) {
    const html = render(TempPassword({ password }));

    const payload: ISendMailOptions = {
      to: email,
      subject: "Tu password temporal",
      html,
    };

    await this.mailer.sendMail(payload);
  }
}
