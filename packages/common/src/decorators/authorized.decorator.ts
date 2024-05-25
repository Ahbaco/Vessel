import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Role } from "@vessel/database/enums";
import { JwtAuthGuard } from "../guards";
import { RolesGuard } from "../guards/role.guard";
import { Roles } from "./role.decorator";

type AuthorizedOptions = {
  role?: Role;
};

export const Authorized = ({ role }: AuthorizedOptions = {}) => {
  const decorators = [ApiBearerAuth(), UseGuards(JwtAuthGuard)];

  if (role) {
    decorators.push(UseGuards(RolesGuard), Roles(role));
  }

  return applyDecorators(...decorators);
};
