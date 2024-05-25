import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty({ isArray: true })
  data: T;
}
