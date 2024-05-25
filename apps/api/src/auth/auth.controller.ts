import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ApiError, ApiReturn, Authorized, InjectAuthService } from "@vessel/common/decorators";
import { CreateAdminUserDto, LoginUserDto } from "@vessel/common/dtos";
import { AuthEvent } from "@vessel/common/enums";
import { LocalAuthGuard } from "@vessel/common/guards";
import { Role } from "@vessel/database/enums";
import { User } from "@vessel/database/schemas";
import { Request } from "express";
import { lastValueFrom } from "rxjs";
import { LoggedUserResponse } from "./dtos/logged-user.response";
import { RegisterModeratorResponse } from "./dtos/register-moderator.response";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(@InjectAuthService() private authClient: ClientProxy) {}

  @ApiError(422)
  @ApiError(403)
  @ApiError(401)
  @ApiError(400)
  @ApiReturn(RegisterModeratorResponse, 201)
  @Authorized({ role: Role.Admin, verified: false })
  @Post("register/admin")
  async registerModerator(@Body() input: CreateAdminUserDto) {
    return await lastValueFrom(this.authClient.send(AuthEvent.RegisterAdmin, input));
  }

  @ApiError(422)
  @ApiError(401)
  @ApiReturn(LoggedUserResponse, 200)
  @UseGuards(LocalAuthGuard)
  @Post("login/local")
  async login(@Body() _credentials: LoginUserDto, @Req() req: Request) {
    const user = req.user;

    const tokens = await lastValueFrom(this.authClient.send(AuthEvent.GetAuthTokens, user));

    return {
      message: "auth.user_logged_in",
      user,
      tokens,
    };
  }

  @ApiError(401)
  @ApiReturn(User, 200)
  @Authorized()
  @Get("me")
  async getUser(@Req() req: Request) {
    return req.user;
  }
}
