import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateNoteDto } from './dto/create-note-dto';
import { UpdateNoteDto } from './dto/update-note-dto';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req: any) {
    return this.notesService.create(createNoteDto, req.user.email);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.notesService.findAll(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.notesService.findOne(id, req.user.email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req: any) {
    return this.notesService.update(id, updateNoteDto, req.user.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.notesService.remove(id, req.user.email);
  }
}
