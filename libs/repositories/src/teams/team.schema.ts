import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaDocument } from "@vessel/database";
import { Types } from "mongoose";
import { Plan } from "../plans/plan.schema";
import { User } from "../users/user.schema";

@Schema({ versionKey: false, timestamps: true })
export class Team extends SchemaDocument {
  @Prop({ type: Types.ObjectId, ref: "Plan", required: true })
  plan: Plan;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  dbName: string;

  @Prop({ required: true, unique: true })
  stripeCustomerId: string;

  @Prop()
  trialEndsAt: Date;

  @Prop({ type: [Types.ObjectId], ref: "User" })
  users: User[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
