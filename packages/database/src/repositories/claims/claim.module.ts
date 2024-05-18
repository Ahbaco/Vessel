import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Claim, ClaimSchema } from "../../schemas/claim.schema";
import { ClaimRepository } from "./claim.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }], Connections.Master),
  ],
  providers: [ClaimRepository],
  exports: [ClaimRepository],
})
export class ClaimModule {}
