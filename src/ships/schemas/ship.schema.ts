import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ShipDocument = HydratedDocument<Ship>;

@Schema()
export class Ship {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  constructor(ship?: Partial<Ship>) {
    Object.assign(this, ship);
  }
}

export const ShipSchema = SchemaFactory.createForClass(Ship);
