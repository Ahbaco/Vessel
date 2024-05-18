import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiProperty, ApiResponse, getSchemaPath } from "@nestjs/swagger";

class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export const ApiError = <TModel extends Type<unknown>>(status = 400, model?: TModel) => {
  return applyDecorators(
    ApiExtraModels(ErrorResponse),
    ApiResponse({
      schema: {
        $ref: getSchemaPath(model ?? ErrorResponse),
      },
      status,
    }),
  );
};
