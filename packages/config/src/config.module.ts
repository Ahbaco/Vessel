import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./env.config";
import { validateConfig } from "./validate.config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: () => validateConfig(),
    }),
  ],
})
export class EnvModule {}
