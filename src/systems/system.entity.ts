import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SystemDocument = HydratedDocument<System>;

@Schema()
export class System {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(system?: Partial<System>) {
        Object.assign(this, system)
    }
}

export const SystemSchema = SchemaFactory.createForClass(System);