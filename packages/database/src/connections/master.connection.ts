import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MasterConnection implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.get("mongodb.uri"),
      dbName: this.config.get("mongodb.master"),
    };
  }
}
