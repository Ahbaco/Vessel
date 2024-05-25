import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { InjectAuthService } from "@vessel/common/decorators";
import { AuthEvent } from "@vessel/common/enums";
import { Strategy } from "passport-local";
import { lastValueFrom } from "rxjs";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectAuthService() private authClient: ClientProxy) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    return await lastValueFrom(this.authClient.send(AuthEvent.ValidateUser, { email, password }));
  }
}
