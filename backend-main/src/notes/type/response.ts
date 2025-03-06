import { Note } from '@prisma/client';

export type CreateNoteResponseData = Note;

export type UpdateNoteResponseData = Note;

export type GetNotesResponseData = {
  notes: Note[];
};
