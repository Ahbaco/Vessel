import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@vessel/database/enums";
import { Types } from "mongoose";
import { Claim } from "../claims/claim.schema";
import { SchemaDocument } from "../schema";
import { Team } from "../teams/team.schema";
import { Token } from "../tokens/token.schema";

@Schema({ versionKey: false, timestamps: true })
export class User extends SchemaDocument {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  surname: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, required: false })
  selectedTeamId?: Types.ObjectId;

  @ApiProperty()
  @Prop({ enum: Role, required: true })
  role: Role;

  @Prop({ required: false, select: false })
  password?: string;

  @ApiProperty()
  @Prop({ required: false })
  verifiedAt?: Date;

  @ApiProperty()
  @Prop({ required: false })
  image?: string;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], ref: "Team", required: false })
  teams?: Team[];

  @ApiProperty()
  @Prop({ type: Map, of: [{ type: Types.ObjectId, ref: "Claim" }], required: false })
  claims?: Map<string, Claim[]>;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], ref: "Token", required: false })
  tokens?: Token[];
}

export const UserSchema = SchemaFactory.createForClass(User);
