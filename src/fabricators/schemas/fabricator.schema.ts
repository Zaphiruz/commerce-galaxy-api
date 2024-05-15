import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FabricatorDocument = HydratedDocument<Fabricator>;

@Schema()
export class Fabricator {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  constructor(fabricator?: Partial<Fabricator>) {
    Object.assign(this, fabricator);
  }
}

export const FabricatorSchema = SchemaFactory.createForClass(Fabricator);
