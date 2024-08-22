import { Injectable, NotFoundException, ForbiddenException,UnauthorizedException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note-dto';
import { Note } from './notes.schema';

@Injectable()
export class NotesService {
  private readonly PAGE_SIZE = 2; // Fixed page size
  constructor(
    @InjectModel('Notes') private readonly notesModel: Model<Note>,
  ) {}

  async insertNote(payload: CreateNoteDto) {
    const createdNote = new this.notesModel(payload);
    const result = await createdNote.save();
    return result.id;
  }

  async getNotes(page?: number) {
    if (page) {
      // Pagination logic
      const skip = (page - 1) * this.PAGE_SIZE;
      const notes = await this.notesModel.find().skip(skip).limit(this.PAGE_SIZE);
      const total = await this.notesModel.countDocuments();
      
      return {
        notes,
        total,
        page,
        pageSize: this.PAGE_SIZE,
        totalPages: Math.ceil(total / this.PAGE_SIZE),
      };
    } else {
      // No pagination
      const notes = await this.notesModel.find();
      return {
        notes,
        total: notes.length,
        page: 1,
        pageSize: notes.length,
        totalPages: 1,
      };
    }
  }


  async getNote(id: string) {
    const note = await this.notesModel.findById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async updateNote(id: string, payload: UpdateNoteDto, user: string) {
    // Find the note by ID
    const existingNote = await this.notesModel.findById(id);
    
    if (!existingNote) {
      throw new NotFoundException('Note not found');
    }

    // Check if the user making the request is the owner of the note
    if (existingNote.user !== user) {
      throw new UnauthorizedException('Invalid user');
    }

    // Update the note
    const updatedNote = await this.notesModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedNote;
  }

  async deleteNote(id: string, user: string) {
    // Find the note by ID
    const existingNote = await this.notesModel.findById(id);
    
    if (!existingNote) {
      throw new NotFoundException('Note not found');
    }

    // Check if the user making the request is the owner of the note
    if (existingNote.user !== user) {
      throw new UnauthorizedException('Invalid user');
    }

    // Delete the note
    const deletedNote = await this.notesModel.findByIdAndDelete(id);
    return deletedNote;
  }
}
