import { IsNotEmpty } from 'class-validator';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StorageDocument = HydratedDocument<Storage>;

@Schema()
export class Storage {
    @IsNotEmpty()
    @Prop()
    name: string;

    constructor(storage?: Partial<Storage>) {
        Object.assign(this, storage)
    }
}

export const StorageSchema = SchemaFactory.createForClass(Storage);