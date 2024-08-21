import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note-dto';
import { Note } from './notes.schema';


@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto, userEmail: string): Promise<Note> {
    const newNote = new this.noteModel({ ...createNoteDto, userEmail });
    return newNote.save();
  }

  async findAll(userEmail: string): Promise<Note[]> {
    return this.noteModel.find({ userEmail }).exec();
  }

  async findOne(id: string, userEmail: string): Promise<Note> {
    const note = await this.noteModel.findOne({ _id: id, userEmail }).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userEmail: string): Promise<Note> {
    const updatedNote = await this.noteModel
      .findOneAndUpdate({ _id: id, userEmail }, updateNoteDto, { new: true })
      .exec();
    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }
    return updatedNote;
  }

  async remove(id: string, userEmail: string): Promise<Note> {
    const note = await this.noteModel.findOneAndDelete({ _id: id, userEmail }).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }
}
