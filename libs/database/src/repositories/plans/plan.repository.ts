import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections, Repository } from "@vessel/database";
import { Connection, Model } from "mongoose";
import { Plan } from "./plan.schema";

@Injectable()
export class PlanRepository extends Repository<Plan> {
  constructor(
    @InjectModel(Plan.name, Connections.Master) model: Model<Plan>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
