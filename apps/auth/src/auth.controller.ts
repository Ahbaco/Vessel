import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateAdminUserDto, LoginUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";
import { User } from "@vessel/database/schemas";
import { Types } from "mongoose";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern(AuthEvent.RegisterAdmin)
  async registerAdmin(@Payload() input: CreateAdminUserDto) {
    return await this.authService.registerAdmin(input);
  }

  @MessagePattern(AuthEvent.ValidateUser)
  async validateUser(@Payload() input: LoginUserDto) {
    return await this.authService.validateUser(input);
  }

  @MessagePattern(AuthEvent.GetAuthTokens)
  async getAuthTokens(@Payload() user: User) {
    return await this.authService.getAuthTokens(user);
  }

  @MessagePattern(AuthEvent.GetUserBySub)
  async getUserBySub(@Payload() sub: Types.ObjectId) {
    return await this.authService.getUserBySub(sub);
  }
}
