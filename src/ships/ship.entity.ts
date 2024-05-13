import { IsNotEmpty } from 'class-validator';
const bcrypt = require('bcrypt');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const SALT_WORK_FACTOR = 10;

export type ShipDocument = HydratedDocument<Ship>;

@Schema()
export class Ship {
    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    name: string;

    constructor(ship?: Partial<Ship>) {
        Object.assign(this, ship)
    }
}

export const ShipSchema = SchemaFactory.createForClass(Ship);