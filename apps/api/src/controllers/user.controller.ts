import { Controller, Get, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ApiError, ApiPaginated, Authorized, InjectAdminService } from "@vessel/common/decorators";
import { AdminEvent } from "@vessel/common/enums";
import { User } from "@vessel/database/schemas";
import { lastValueFrom } from "rxjs";
import { PaginationDto } from "../dtos/paginated.dto";

@Authorized()
@ApiTags("Admin/Users")
@Controller("admin/users")
export class UserController {
  constructor(@InjectAdminService() private adminClient: ClientProxy) {}

  @ApiError(400)
  @ApiPaginated(User)
  @Get()
  async getUserPaginated(@Query() data: PaginationDto) {
    const { page, perPage, by, order } = data;

    const sort = {
      [by]: order === "asc" ? 1 : -1,
    };

    return lastValueFrom(
      this.adminClient.send(AdminEvent.GetPaginatedUsers, {
        page,
        perPage,
        sort,
      }),
    );
  }
}
