import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaDocument } from "@vessel/database";
import { Types } from "mongoose";
import { PlanLabel } from "../../enums/plan-label.enum";
import { PlanPeriod } from "../../enums/plan-period.enum";

@Schema({ versionKey: false, timestamps: true })
export class Plan extends SchemaDocument {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: String, enum: PlanLabel })
  label: PlanLabel;

  @Prop({ required: true, type: Types.Decimal128 })
  price: number;

  @Prop({ required: true, unique: true })
  stripePriceId: string;

  @Prop({ required: true, type: Number, enum: PlanPeriod })
  period: PlanPeriod;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
