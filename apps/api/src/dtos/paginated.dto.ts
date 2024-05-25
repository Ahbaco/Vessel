import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsString, Max, Min } from "class-validator";

export class PaginationDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  page: number;

  @IsInt()
  @Min(1)
  @Max(100)
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
