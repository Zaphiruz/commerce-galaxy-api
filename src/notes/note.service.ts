import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Note } from './schemas/note.schema';
import { NewNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(newNoteDto: NewNoteDto): Promise<Note> {
    const createdCat = new this.noteModel({ ...newNoteDto });
    return createdCat.save();
  }

  async findAll(query = null): Promise<Note[]> {
    return this.noteModel.find(query).exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(
      id,
      { $set: updateNoteDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id);
  }

  async findByNotename(notename: string) {
    return this.noteModel.findOne({ notename });
  }
}
