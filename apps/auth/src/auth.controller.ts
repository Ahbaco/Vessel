import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateAdminUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";

@Controller()
export class AuthController {
  @MessagePattern(AuthEvent.RegisterAdmin)
  async registerAdmin(@Payload() input: CreateAdminUserDto) {
    return {
      data: input,
    };
  }
}
