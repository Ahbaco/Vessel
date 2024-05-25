import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PassportStrategy } from "@nestjs/passport";
import { JwtSecret } from "@vessel/common/constants";
import { InjectAuthService } from "@vessel/common/decorators";
import { AuthEvent } from "@vessel/common/enums";
import { Role } from "@vessel/database/enums";
import { Types } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { lastValueFrom } from "rxjs";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectAuthService() private authClient: ClientProxy) {
    super({
      secretOrKey: JwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: {
    sub: Types.ObjectId;
    selectedTeamId: Types.ObjectId;
    verifiedAt: Date | null;
    role: Role;
  }) {
    const user = await lastValueFrom(this.authClient.send(AuthEvent.GetUserBySub, payload.sub));

    if (!user) {
      return payload;
    }

    const { password, ...data } = user;

    return data;
  }
}
