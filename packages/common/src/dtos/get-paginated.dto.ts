import { ApiProperty } from "@nestjs/swagger";

export class GetPaginatedDataDto {
  @ApiProperty()
  perPage: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  sort: never;
}
