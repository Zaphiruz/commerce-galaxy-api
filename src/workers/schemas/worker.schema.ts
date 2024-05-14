import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
    @Transform(({ value }) => value.toHexString())
    @ApiProperty({ type: String })
    _id: Types.ObjectId;

    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    name: string;

    constructor(worker?: Partial<Worker>) {
        Object.assign(this, worker)
    }
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);