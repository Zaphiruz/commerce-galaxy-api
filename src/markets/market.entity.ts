import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MarketDocument = HydratedDocument<Market>;

@Schema()
export class Market {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(market?: Partial<Market>) {
        Object.assign(this, market)
    }
}

export const MarketSchema = SchemaFactory.createForClass(Market);