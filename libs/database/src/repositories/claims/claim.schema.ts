import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaDocument } from "@vessel/database";

@Schema({ versionKey: false })
export class Claim extends SchemaDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  subject: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
