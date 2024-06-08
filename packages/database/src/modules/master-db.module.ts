import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MasterConnection } from "../connections";
import { MasterDefinition } from "../definitions/master.definition";
import { Connections } from "../enums";
import {
  ClaimRepository,
  PlanRepository,
  TeamRepository,
  TokenRepository,
  UserRepository,
} from "../repositories";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MasterConnection,
      connectionName: Connections.Master,
    }),
    MongooseModule.forFeature(MasterDefinition, Connections.Master),
  ],
  exports: [UserRepository, TokenRepository, ClaimRepository, PlanRepository, TeamRepository],
  providers: [UserRepository, TokenRepository, ClaimRepository, PlanRepository, TeamRepository],
})
export class MasterDatabaseModule {}
