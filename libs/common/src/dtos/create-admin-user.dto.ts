import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class CreateAdminUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: "Vladimil" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ default: "Jimenez" })
  surname: string;

  @IsNotEmpty()
  @ApiProperty({ default: "vladimil.js@ahbaco.com" })
  email: string;

  @Match("email")
  @IsNotEmpty()
  @ApiProperty({ default: "vladimil.js@ahbaco.com" })
  confirmEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  claims: string[];
}
