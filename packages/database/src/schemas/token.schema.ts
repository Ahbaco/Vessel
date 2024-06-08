import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomString } from "@vessel/common/utils";
import { Types } from "mongoose";
import { SchemaDocument } from "./schema";
import { User } from "./user.schema";

@Schema()
export class Token extends SchemaDocument {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: false, default: randomString(16, true) })
  value?: string;

  @ApiProperty()
  @Prop({ required: true })
  expiresAt: Date;

  @ApiProperty()
  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
