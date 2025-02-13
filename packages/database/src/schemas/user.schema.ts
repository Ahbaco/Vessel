import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@vessel/database/enums";
import { Types } from "mongoose";
import { SchemaDocument } from "./schema";
import { Team } from "./team.schema";
import { Token } from "./token.schema";

@Schema()
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
  @Prop({ type: String, required: false })
  selectedTeamId?: string;

  @ApiProperty({ type: String, enum: Role })
  @Prop({ enum: Role, required: true, type: () => Role })
  role: Role;

  @Prop({ required: false })
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
  @Prop({ type: [Types.ObjectId], ref: "Token", required: false })
  tokens?: Token[];
}

export const UserSchema = SchemaFactory.createForClass(User);
