import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { CreateAdminUserDto } from "@vessel/common/dtos";
import { randomString } from "@vessel/common/utils";
import { UserRepository } from "@vessel/database/repositories";
import { hash } from "argon2";

@Injectable()
export class AuthService {
  constructor(private users: UserRepository) {}

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

    return { message: "auth.user_created", user };
  }
}
