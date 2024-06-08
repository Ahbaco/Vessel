import { ModelDefinition } from "@nestjs/mongoose";
import {
  Claim,
  ClaimSchema,
  Plan,
  PlanSchema,
  Team,
  TeamSchema,
  Token,
  TokenSchema,
  User,
  UserSchema,
} from "../schemas";

export const MasterDefinition: ModelDefinition[] = [
  { name: User.name, schema: UserSchema },
  { name: Token.name, schema: TokenSchema },
  { name: Claim.name, schema: ClaimSchema },
  { name: Team.name, schema: TeamSchema },
  { name: Plan.name, schema: PlanSchema },
];
