import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { ApiError, ApiReturn, InjectAuthService } from "@vessel/common/decorators";
import { CreateAdminUserDto, LoginUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";
import { Request } from "express";
import { lastValueFrom } from "rxjs";
import { RegisterModeratorResponse } from "./dtos/register-moderator.response";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(@InjectAuthService() private authClient: ClientProxy) {}

  @ApiError(422)
  @ApiError(400)
  @ApiReturn(RegisterModeratorResponse, 201)
  @Post("register/admin")
  async registerModerator(@Body() input: CreateAdminUserDto) {
    return await lastValueFrom(this.authClient.send(AuthEvent.RegisterAdmin, input));
  }

  @ApiError(422)
  @ApiError(401)
  @UseGuards(AuthGuard("local"))
  @Post("login/local")
  async login(@Body() _credentials: LoginUserDto, @Req() req: Request) {
    return req.user;
  }
}
