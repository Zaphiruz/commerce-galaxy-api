import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, Length, isNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import * as mongoose from 'mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BuildingDocument = HydratedDocument<Building>;

@Schema()
export class Building {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(building?: Partial<Building>) {
        Object.assign(this, building)
    }
}

export const BuildingSchema = SchemaFactory.createForClass(Building);