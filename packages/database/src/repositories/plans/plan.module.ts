import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Plan, PlanSchema } from "@vessel/database/schemas";
import { PlanRepository } from "./plan.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }], Connections.Master),
  ],
  providers: [PlanRepository],
  exports: [PlanRepository],
})
export class PlanModule {}
