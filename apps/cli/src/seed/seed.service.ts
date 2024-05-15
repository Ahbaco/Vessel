import { Injectable } from "@nestjs/common";
import { CaslActions, CaslSubjects } from "@vessel/common/constants";
import { ClaimRepository } from "@vessel/database";

@Injectable()
export class SeedService {
  constructor(private claimRepository: ClaimRepository) {}

  async claims() {
    const promises = [];

    promises.push(
      this.claimRepository.upsert({
        input: { subject: "tenant", action: "manage" },
        filter: { subject: "tenant", action: "manage" },
      }),
    );

    promises.push(
      this.claimRepository.upsert({
        input: { subject: "all", action: "manage" },
        filter: { subject: "all", action: "manage" },
      }),
    );

    for (const subject of CaslSubjects) {
      if (subject === "tenant") continue;

      for (const action of CaslActions) {
        const promise = this.claimRepository.upsert({
          input: { subject, action },
          filter: { subject, action },
        });

        promises.push(promise);
      }
    }

    await Promise.all(promises);
  }
}
