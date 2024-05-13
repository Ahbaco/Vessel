import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database";
import { PlanRepository } from "./plan.repository";
import { Plan, PlanSchema } from "./plan.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }], Connections.Master),
  ],
  providers: [PlanRepository],
  exports: [PlanRepository],
})
export class PlanModule {}
