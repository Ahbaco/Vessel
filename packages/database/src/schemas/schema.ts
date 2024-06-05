import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class SchemaDocument {
  @ApiProperty()
  @Prop({ type: String, required: true })
  _id: string;
}
