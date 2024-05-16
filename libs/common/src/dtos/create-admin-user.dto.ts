import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@vessel/database";
import { IsEnum, IsNotEmpty, NotEquals } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class CreateAdminUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: "Homer" })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ default: "Simpson" })
  surname: string;

  @IsNotEmpty()
  @ApiProperty({ default: "Homer.s@ahbaco.com" })
  email: string;

  @Match("email", { message: "validation.email_mismatch" })
  @IsNotEmpty()
  @ApiProperty({ default: "Homer.s@ahbaco.com" })
  confirmEmail: string;

  @ApiProperty({ enum: Role, type: () => Role })
  @IsEnum(Role)
  @NotEquals(Role.TenantAdmin)
  @NotEquals(Role.TenantMember)
  @NotEquals(Role.TenantOwner)
  role: Role;
}
