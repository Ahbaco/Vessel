import { Logger } from "@nestjs/common";
import { Command, CommandRunner } from "nest-commander";
import { SeedService } from "./seed.service";

type Argunment = "claims" | "all";

@Command({ name: "seed", arguments: "<schema>", description: "Seed database" })
export class SeedCommand extends CommandRunner {
  constructor(private seedService: SeedService) {
    super();
  }

  async run(input: string[]) {
    const schema = input[0] as Argunment;
    const logger = new Logger();

    switch (schema) {
      case "claims":
        await this.seedService.claims();
        logger.verbose("Claims seeded");
        break;
      case "all":
        await this.seedService.claims();
        logger.verbose("Claims seeded");
        break;
      default:
        logger.error("Invalid schema");
    }
  }
}
