import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database";
import { ClaimRepository } from "./claim.repository";
import { Claim, ClaimSchema } from "./claim.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }], Connections.Master),
  ],
  providers: [ClaimRepository],
  exports: [ClaimRepository],
})
export class ClaimModule {}
