import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Connection, Model } from "mongoose";
import { Team } from "../schemas";
import { Repository } from "./repository";

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(
    @InjectModel(Team.name, Connections.Master) model: Model<Team>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
