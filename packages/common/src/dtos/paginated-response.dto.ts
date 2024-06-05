import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;

  data: TData[];
}
