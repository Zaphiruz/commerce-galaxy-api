import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FabricatorDocument = HydratedDocument<Fabricator>;

@Schema()
export class Fabricator {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(fabricator?: Partial<Fabricator>) {
        Object.assign(this, fabricator)
    }
}

export const FabricatorSchema = SchemaFactory.createForClass(Fabricator);