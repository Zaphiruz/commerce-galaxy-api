import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
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
