import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Connection, Model } from "mongoose";
import { Token } from "../schemas";
import { Repository } from "./repository";

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(
    @InjectModel(Token.name, Connections.Master) model: Model<Token>,
    @InjectConnection(Connections.Master) connection: Connection,
  ) {
    super(model, connection);
  }
}
