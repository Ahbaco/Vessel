import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false, timestamps: true })
export class SchemaDocument {
  @ApiProperty()
  @Prop({ type: String, required: true })
  _id: string;

  @ApiProperty()
  @Prop({ type: Date, required: false })
  createdAt?: Date;

  @ApiProperty()
  @Prop({ type: Date, required: false })
  updatedAt?: Date;
}
