import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Note } from './schemas/note.schema';
import { CrudBaseService } from 'src/crud-base/crud-base.service';

@Injectable()
export class NoteService extends CrudBaseService<Note> {
	logger = new Logger(Note.name);

	constructor(@InjectModel(Note.name) private model: Model<Note>) {
		super(model);
		this.setLogger(this.logger);
	}
}
