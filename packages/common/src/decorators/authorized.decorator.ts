import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Role } from "@vessel/database/enums";
import { JwtAuthGuard, VerifiedGuard } from "../guards";
import { RolesGuard } from "../guards/role.guard";
import { Roles } from "./role.decorator";

type AuthorizedOptions = {
  role?: Role;
  verified?: boolean;
};

export const Authorized = ({ role, verified = true }: AuthorizedOptions = {}) => {
  const decorators = [ApiBearerAuth(), UseGuards(JwtAuthGuard)];

  if (role) {
    decorators.push(UseGuards(RolesGuard), Roles(role));
  }

  if (verified) {
    decorators.push(UseGuards(VerifiedGuard));
  }

  return applyDecorators(...decorators);
};
