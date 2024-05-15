import { Module } from "@nestjs/common";
import { ClaimModule, DatabaseModule } from "@vessel/database";
import { SeedCommand } from "./seed.command";
import { SeedService } from "./seed.service";

@Module({
  imports: [DatabaseModule, ClaimModule],
  providers: [SeedCommand, SeedService],
})
export class SeedModule {}
