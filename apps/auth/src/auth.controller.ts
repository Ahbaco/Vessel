import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateAdminUserDto, LoginUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";
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
}
