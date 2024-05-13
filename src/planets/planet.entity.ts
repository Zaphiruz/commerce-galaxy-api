import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanetDocument = HydratedDocument<Planet>;

@Schema()
export class Planet {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(planet?: Partial<Planet>) {
        Object.assign(this, planet)
    }
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);