import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MarketDocument = HydratedDocument<Market>;

@Schema()
export class Market {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  constructor(market?: Partial<Market>) {
    Object.assign(this, market);
  }
}

export const MarketSchema = SchemaFactory.createForClass(Market);
