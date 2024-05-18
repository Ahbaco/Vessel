import { HttpCode, Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiReturn = <TModel extends Type<unknown>>(model: TModel, status = 200) => {
  return applyDecorators(
    ApiExtraModels(model),
    HttpCode(status),
    ApiResponse({
      schema: {
        $ref: getSchemaPath(model),
      },
      status,
    }),
  );
};

export const ApiArrayReturn = <TModel extends Type<unknown>>(model: TModel, status = 200) => {
  return applyDecorators(
    ApiExtraModels(model),
    HttpCode(status),
    ApiResponse({
      status,
      schema: {
        items: { type: "array", $ref: getSchemaPath(model) },
      },
    }),
  );
};
