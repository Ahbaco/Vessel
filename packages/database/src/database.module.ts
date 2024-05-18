import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MasterConnection } from "./connections/master.connection";
import { SystemConnection } from "./connections/system.connection";
import { Connections } from "./enums/connection.enum";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MasterConnection,
      connectionName: Connections.Master,
    }),
    MongooseModule.forRootAsync({
      useClass: SystemConnection,
      connectionName: Connections.System,
    }),
  ],
})
export class DatabaseModule {}
