import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections, Repository } from "@vessel/database";
import { Connection, Model } from "mongoose";
import { Team } from "./team.schema";

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(
    @InjectModel(Team.name, Connections.Master) model: Model<Team>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
