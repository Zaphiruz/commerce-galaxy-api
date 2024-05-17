import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Note } from './schemas/note.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class NoteService extends CrudBaseService<Note> {
	constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {
		super(noteModel);
	}
}
