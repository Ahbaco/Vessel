import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Connection, Model } from "mongoose";
import { Plan } from "../schemas";
import { Repository } from "./repository";

@Injectable()
export class PlanRepository extends Repository<Plan> {
  constructor(
    @InjectModel(Plan.name, Connections.Master) model: Model<Plan>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
