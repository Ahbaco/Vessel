import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database";
import { Team, TeamSchema } from "../../schemas/team.schema";
import { TeamRepository } from "./team.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }], Connections.Master),
  ],
  providers: [TeamRepository],
  exports: [TeamRepository],
})
export class TeamModule {}
