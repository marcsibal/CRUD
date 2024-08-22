import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './notes.schema';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notes', schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService], // Ensure NotesService is exported if needed in other modules
})
export class NotesModule {}
