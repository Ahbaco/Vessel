import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Types.ObjectId })
  selectedTeamId: Types.ObjectId;

  @Prop({ enum: Role, required: true, default: Role.Client })
  role: Role;

  @Prop()
  password: string;

  @Prop()
  verifiedAt: Date;

  @Prop()
  image: string;

  @Prop({ type: [Types.ObjectId], ref: "Team" })
  teams: Team[];

  @Prop({ type: Map, of: [{ type: Types.ObjectId, ref: "Claim" }] })
  claims: Map<string, Claim[]>;

  @Prop({ type: [Types.ObjectId], ref: "Token" })
  tokens: Token[];
}

export const UserSchema = SchemaFactory.createForClass(User);
