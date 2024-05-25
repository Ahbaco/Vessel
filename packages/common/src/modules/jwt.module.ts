import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule as Jwt } from "@nestjs/jwt";

@Module({
  imports: [
    Jwt.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("app.secret"),
        signOptions: {
          expiresIn: config.get("jwt.expire"),
        },
      }),
    }),
  ],
})
export class JwtModule {}
