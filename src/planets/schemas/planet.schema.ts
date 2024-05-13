import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type PlanetDocument = HydratedDocument<Planet>;

@Schema()
export class Planet {
    @Transform(({ value }) => value.toHexString())
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Prop()
    name: string;

    constructor(planet?: Partial<Planet>) {
        Object.assign(this, planet)
    }
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);