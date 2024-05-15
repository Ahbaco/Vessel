import { ApiProperty } from "@nestjs/swagger";
import { User } from "@vessel/database";

export class RegisterModeratorResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  user: User;
}
