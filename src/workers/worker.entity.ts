import { IsNotEmpty } from 'class-validator';
const bcrypt = require('bcrypt');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const SALT_WORK_FACTOR = 10;

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    name: string;

    constructor(worker?: Partial<Worker>) {
        Object.assign(this, worker)
    }
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);