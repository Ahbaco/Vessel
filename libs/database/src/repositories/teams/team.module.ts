import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database";
import { TeamRepository } from "./team.repository";
import { Team, TeamSchema } from "./team.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }], Connections.Master),
  ],
  providers: [TeamRepository],
  exports: [TeamRepository],
})
export class TeamModule {}
