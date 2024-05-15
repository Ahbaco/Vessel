import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaDocument } from "@vessel/database";

@Schema({ versionKey: false })
export class Claim extends SchemaDocument {
  @ApiProperty()
  @Prop({ required: true })
  action: string;

  @ApiProperty()
  @Prop({ required: true })
  subject: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
