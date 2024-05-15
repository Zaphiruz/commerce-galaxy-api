import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  content: string;

  @Prop({ required: true, unique: true })
  date: string;

  // Sender
  // Recipient
  // Type
  // Status

  constructor(note?: Partial<Note>) {
    Object.assign(this, note);
  }
}

export const NoteSchema = SchemaFactory.createForClass(Note);
