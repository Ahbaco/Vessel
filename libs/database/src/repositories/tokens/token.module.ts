import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Connections } from "@vessel/database";
import { TokenRepository } from "./token.repository";
import { Token, TokenSchema } from "./token.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }], Connections.Master),
  ],
  providers: [TokenRepository],
  exports: [TokenRepository],
})
export class TokenModule {}
