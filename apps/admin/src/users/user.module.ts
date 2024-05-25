import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "@vessel/database/repositories";
import { UserBroker } from "./user.broker";

@Module({
  controllers: [UserBroker],
  imports: [UserRepositoryModule],
})
export class UserModule {}
