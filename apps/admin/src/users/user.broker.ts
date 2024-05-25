import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GetPaginatedDataDto } from "@vessel/common/dtos";
import { AdminEvent } from "@vessel/common/enums";
import { UserRepository } from "@vessel/database/repositories";

@Controller()
export class UserBroker {
  constructor(private users: UserRepository) {}

  @MessagePattern(AdminEvent.GetPaginatedUsers)
  async paginatedUsers(@Payload() data: GetPaginatedDataDto) {
    return await this.users.paginated(data);
  }
}
