import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaDocument } from "@vessel/database";
import { Types } from "mongoose";
import { Plan } from "../plans/plan.schema";
import { User } from "../users/user.schema";

@Schema({ versionKey: false, timestamps: true })
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
