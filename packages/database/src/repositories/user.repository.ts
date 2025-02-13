import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Connection, Model } from "mongoose";
import { User } from "../schemas";
import { Repository } from "./repository";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectModel(User.name, Connections.Master) model: Model<User>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
