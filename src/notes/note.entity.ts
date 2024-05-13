import { IsNotEmpty } from 'class-validator';
const bcrypt = require('bcrypt');
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const SALT_WORK_FACTOR = 10;

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
    @IsNotEmpty()
    @Prop({ required: true, unique: true })
    name: string;

    constructor(note?: Partial<Note>) {
        Object.assign(this, note)
    }
}

export const NoteSchema = SchemaFactory.createForClass(Note);
