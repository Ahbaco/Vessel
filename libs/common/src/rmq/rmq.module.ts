import { Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";

@Module({
  exports: [RmqService],
  providers: [RmqService],
})
export class RmqModule {}
