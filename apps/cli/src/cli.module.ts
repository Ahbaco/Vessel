import { Module } from "@nestjs/common";
import { EnvModule } from "@vessel/config";
import { SeedModule } from "./seed/seed.module";

@Module({
  imports: [EnvModule, SeedModule],
})
export class CliModule {}
