import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections, Repository } from "@vessel/database";
import { Connection, Model } from "mongoose";
import { Claim } from "./claim.schema";

@Injectable()
export class ClaimRepository extends Repository<Claim> {
  constructor(
    @InjectModel(Claim.name, Connections.Master) model: Model<Claim>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
