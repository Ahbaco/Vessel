import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

export class PaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @IsString()
  @ApiProperty()
  by: string;

  @IsString()
  @IsIn(["asc", "desc"])
  @ApiProperty()
  order: string;
}
