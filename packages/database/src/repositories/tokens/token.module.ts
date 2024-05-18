import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database/enums";
import { Token, TokenSchema } from "../../schemas/token.schema";
import { TokenRepository } from "./token.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }], Connections.Master),
  ],
  providers: [TokenRepository],
  exports: [TokenRepository],
})
export class TokenModule {}
