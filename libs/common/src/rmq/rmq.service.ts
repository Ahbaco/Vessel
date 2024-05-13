import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { RmqQueues } from "./rmq-queues.enum";

@Injectable()
export class RmqService {
  constructor(private config: ConfigService) {}

  getOptions(queue: RmqQueues, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.config.get("rmq.uri") as string],
        queue,
        noAck,
        persistent: true,
      },
    };
  }
}
