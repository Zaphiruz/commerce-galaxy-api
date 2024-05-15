import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BuildingTypeEnum } from '../building-type.enum';
import { Base } from 'src/bases/schemas/base.schema';

export type BuildingDocument = HydratedDocument<Building>;

@Schema()
export class Building {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  type: BuildingTypeEnum;

  @Prop({ type: Types.ObjectId, ref: 'Base', required: true })
  @ApiProperty({ type: String })
  base: Base;

  constructor(building?: Partial<Building>) {
    Object.assign(this, building);
  }
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
