import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Plan } from "./plan.schema";
import { SchemaDocument } from "./schema";
import { User } from "./user.schema";

@Schema()
export class Team extends SchemaDocument {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: "Plan", required: true })
  plan: Plan;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  dbName: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  stripeCustomerId: string;

  @ApiProperty()
  @Prop()
  trialEndsAt: Date;

  @ApiProperty()
  @Prop({ type: [Types.ObjectId], ref: "User" })
  users: User[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
