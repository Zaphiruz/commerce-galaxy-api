import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type StorageDocument = HydratedDocument<Storage>;

@Schema()
export class Storage {
    @ApiProperty({ type: String })
    _id: Types.ObjectId;
    
    @Prop()
    name: string;

    constructor(storage?: Partial<Storage>) {
        Object.assign(this, storage)
    }
}

export const StorageSchema = SchemaFactory.createForClass(Storage);