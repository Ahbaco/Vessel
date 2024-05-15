import { Body, Controller, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ApiError, ApiReturn, InjectAuthService } from "@vessel/common/decorators";
import { CreateAdminUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";
import { lastValueFrom } from "rxjs";
import { RegisterModeratorResponse } from "./dtos/register-moderator.response";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(@InjectAuthService() private authClient: ClientProxy) {}

  @ApiError(422)
  @ApiReturn(RegisterModeratorResponse, 201)
  @Post("register/admin")
  async registerModerator(@Body() input: CreateAdminUserDto) {
    return await lastValueFrom(this.authClient.send(AuthEvent.RegisterAdmin, input));
  }
}
