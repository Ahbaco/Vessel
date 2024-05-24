import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvModule } from "@vessel/config";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";

@Module({
  imports: [
    EnvModule,
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          transport: {
            target: "@logtail/pino",
            options: {
              sourceToken: config.get("logtail.token"),
              sync: false,
            },
          },
        },
      }),
    }),
  ],
})
export class LoggerModule {}
