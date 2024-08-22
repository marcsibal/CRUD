import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Patch, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note-dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.insertNote(createNoteDto);
  }

  @Get()
  async getNotes(
    @Query('page') page?: string, // Page is optional
  ) {
    const pageNumber = page ? parseInt(page, 10) : undefined;
    return this.notesService.getNotes(pageNumber);
  }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    return this.notesService.getNote(id);
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Body('user') user: string, // Add user to the request body
  ) {
    return this.notesService.updateNote(id, updateNoteDto, user);
  }

  @Delete(':id')
  async deleteNote(
    @Param('id') id: string,
    @Body('user') user: string, // Add user to the request body
  ) {
    return this.notesService.deleteNote(id, user);
  }
}
