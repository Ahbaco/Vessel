import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections, Repository } from "@vessel/database";
import { Connection, Model } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectModel(User.name, Connections.Master) model: Model<User>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
