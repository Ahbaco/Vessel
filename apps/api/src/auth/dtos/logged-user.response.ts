import { ApiProperty } from "@nestjs/swagger";
import { User } from "@vessel/database/schemas";

class Tokens {
  @ApiProperty()
  access: string;

  @ApiProperty()
  refresh: string;
}

export class LoggedUserResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  tokens: Tokens;
}
