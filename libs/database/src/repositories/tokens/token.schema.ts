import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaDocument } from "@vessel/database";
import { Types } from "mongoose";
import { User } from "../users/user.schema";

@Schema({ versionKey: false })
export class Token extends SchemaDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
