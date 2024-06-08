import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Connection, Model } from "mongoose";
import { Claim } from "../schemas";
import { Repository } from "./repository";

@Injectable()
export class ClaimRepository extends Repository<Claim> {
  constructor(
    @InjectModel(Claim.name, Connections.Master) model: Model<Claim>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
