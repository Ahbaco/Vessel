import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class SchemaDocument {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
