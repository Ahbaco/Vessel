import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateAdminUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern(AuthEvent.RegisterAdmin)
  async registerAdmin(@Payload() input: CreateAdminUserDto) {
    return await this.authService.registerAdmin(input);
  }
}
