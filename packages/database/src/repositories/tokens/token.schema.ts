import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaDocument } from "@vessel/database";
import { Types } from "mongoose";
import { User } from "../users/user.schema";

@Schema({ versionKey: false })
export class Token extends SchemaDocument {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  value: string;

  @ApiProperty()
  @Prop({ required: true })
  expiresAt: Date;

  @ApiProperty()
  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
