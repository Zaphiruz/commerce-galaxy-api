import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, Length, isNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import * as mongoose from 'mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BaseDocument = HydratedDocument<Base>;

@Schema()
export class Base {
    @IsNotEmpty()
    @Prop()
    name: string;

    @IsNotEmpty()
    @Prop()
    size: number;

    // @IsNotEmpty()
    // @Prop({name: 'planet_id'})
    // planet_id: string;

    // @IsNotEmpty()
    // @Prop({name: 'owner_id'})
    // owner_id: string;

    @IsMongoId()
    @Prop({type: Types.ObjectId, ref: 'Planet'})
    planet: Types.ObjectId;

    @IsMongoId()
    @Prop({type: Types.ObjectId, ref: 'User'})
    user: Types.ObjectId;

    constructor(base?: Partial<Base>) {
        Object.assign(this, base)
    }
}

export const BaseSchema = SchemaFactory.createForClass(Base);