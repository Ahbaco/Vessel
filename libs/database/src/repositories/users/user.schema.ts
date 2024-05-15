import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaDocument } from "@vessel/database";
import { Types } from "mongoose";
import { Claim } from "../claims/claim.schema";
import { Team } from "../teams/team.schema";
import { Token } from "../tokens/token.schema";

export enum Role {
  Admin = "admin",
  Client = "client",
}

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
  @Prop({ type: Types.ObjectId })
  selectedTeamId: Types.ObjectId;

  @ApiProperty()
  @Prop({ enum: Role, required: true, default: Role.Client })
  role: Role;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  verifiedAt: Date;

  @ApiProperty()
  @Prop()
  image: string;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], ref: "Team" })
  teams: Team[];

  @ApiProperty()
  @Prop({ type: Map, of: [{ type: Types.ObjectId, ref: "Claim" }] })
  claims: Map<string, Claim[]>;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], ref: "Token" })
  tokens: Token[];
}

export const UserSchema = SchemaFactory.createForClass(User);
