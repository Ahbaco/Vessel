import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { InjectNotificationService } from "@vessel/common/decorators";
import { CreateAdminUserDto, LoginUserDto } from "@vessel/common/dtos";
import { NotificationEvent } from "@vessel/common/enums";
import { SendTempPasswordEmail } from "@vessel/common/interfaces";
import { randomString } from "@vessel/common/utils";
import { TokenRepository, UserRepository } from "@vessel/database/repositories";
import { User } from "@vessel/database/schemas";
import { hash, verify } from "argon2";
import { Types } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    private users: UserRepository,
    @InjectNotificationService() private notificationClient: ClientProxy,
    private tokens: TokenRepository,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  private async checkEmailIsValid(email: string) {
    if (email.endsWith("@ahbaco.com")) {
      return true;
    }

    return false;
  }

  private async checkEmail(email: string) {
    const user = await this.users.one({ filter: { email } });

    if (user) return true;

    return false;
  }

  private async hashPassword(password: string) {
    return await hash(password);
  }

  async registerAdmin(input: CreateAdminUserDto) {
    const emailIsValid = await this.checkEmailIsValid(input.email);

    if (!emailIsValid) {
      throw new RpcException({
        statusCode: 422,
        message: "auth.invalid_email",
      });
    }

    const emailExists = await this.checkEmail(input.email);

    if (emailExists) {
      throw new RpcException({
        statusCode: 422,
        message: "auth.email_exists",
      });
    }

    const { confirmEmail, ...data } = input;
    const plainPassword = randomString(12, true);

    const user = await this.users.store({
      ...data,
      password: await this.hashPassword(plainPassword),
    });

    this.notificationClient.emit<never, SendTempPasswordEmail>(NotificationEvent.SendTempPassword, {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: plainPassword,
    });

    return { message: "auth.user_created", user };
  }

  private async genToken(user: User, name: string, expires: number) {
    const expiresAt = new Date();

    expiresAt.setSeconds(expiresAt.getSeconds() + expires / 1000);

    return await this.tokens.store({
      name,
      user,
      expiresAt,
    });
  }

  async getAuthTokens(user: User) {
    const jwtPayload = {
      sub: user._id,
      selectedTeamId: user.selectedTeamId,
      role: user.role,
      verifedAt: user.verifiedAt,
    };

    const [access, refresh] = await Promise.all([
      this.jwt.sign(jwtPayload),
      this.genToken(user, "refresh_token", Number(this.config.get("jwt.refreshExpire"))),
    ]);

    return { access, refresh: refresh.value };
  }

  async validateUser(input: LoginUserDto) {
    const user = await this.users.one({
      filter: { email: input.email },
    });

    if (!user) {
      throw new RpcException({
        statusCode: 401,
        message: "auth.invalid_credentials",
      });
    }

    const isValid = await verify(String(user.password), input.password);

    if (!isValid) {
      throw new RpcException({
        statusCode: 401,
        message: "auth.invalid_credentials",
      });
    }

    const { password, ...data } = user;

    return data;
  }

  async getUserBySub(sub: Types.ObjectId) {
    return await this.users.one({
      filter: { _id: sub },
      projection: { password: 0 },
    });
  }
}
