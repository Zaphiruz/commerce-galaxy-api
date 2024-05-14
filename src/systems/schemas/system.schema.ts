import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type SystemDocument = HydratedDocument<System>;

@Schema()
export class System {
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    name: string;

    constructor(system?: Partial<System>) {
        Object.assign(this, system)
    }
}

export const SystemSchema = SchemaFactory.createForClass(System);