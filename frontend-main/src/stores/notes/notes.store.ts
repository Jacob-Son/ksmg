import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { TNotesStore } from './notes.types';
import { TCreateStore } from '../store.types';
import { initialNoteState } from './notes.constants';
import { INote } from '~/types/note';
import { noteApi } from 'src/services/note_api';

const createStore = (set: TCreateStore<TNotesStore>) => {
  return {
    ...initialNoteState,
    setNotes: (notes: INote[]) =>
      set(() => {
        const result = {};

        for (const note of notes) {
          result[note.bookId] = {
            ...result[note.bookId],
            [note.pageNumber]: [
              ...(result[note.bookId]?.[note.pageNumber] || []),
              note,
            ],
          };
        }

        return {
          notes: result,
        };
      }),
    addNote: (note: INote) =>
      set((state) => {
        const { notes } = state;
        if (
          notes[note.bookId] &&
          notes[note.bookId][note.pageNumber] &&
          notes[note.bookId][note.pageNumber].find(
            (n) => n.noteId === note.noteId,
          )
        ) {
          return;
        }
        noteApi.createNote(
          note.bookId,
          note.userAddress,
          note.pageNumber,
          note.notePositionX,
          note.notePositionY,
          note.noteContent,
        );

        return {
          notes: {
            ...notes,
            [note.bookId]: {
              ...notes[note.bookId],
              [note.pageNumber]: [
                ...(notes[note.bookId]?.[note.pageNumber] || []),
                note,
              ],
            },
          },
        };
      }),
    updateNote: (note: INote) =>
      set((state) => {
        const { notes } = state;
        if (
          notes[note.bookId] &&
          notes[note.bookId][note.pageNumber] &&
          !notes[note.bookId][note.pageNumber].find(
            (n) => n.noteId === note.noteId,
          )
        ) {
          return;
        }

        noteApi.updateNote(
          note.noteId,
          note.notePositionX,
          note.notePositionY,
          note.noteContent,
        );

        return {
          notes: {
            ...notes,
            [note.bookId]: {
              ...notes[note.bookId],
              [note.pageNumber]: notes[note.bookId]?.[note.pageNumber]?.map(
                (x) =>
                  x.noteId === note.noteId
                    ? {
                        ...x,
                        noteContent: note.noteContent,
                        notePositionX: note.notePositionX,
                        notePositionY: note.notePositionY,
                        updateAt: new Date(),
                      }
                    : x,
              ),
            },
          },
        };
      }),
    deleteNote: (note: INote) =>
      set((state) => {
        const { notes } = state;

        if (
          notes[note.bookId] &&
          notes[note.bookId][note.pageNumber] &&
          !notes[note.bookId][note.pageNumber].find(
            (n) => n.noteId === note.noteId,
          )
        ) {
          return;
        }

        noteApi.deleteNote(note.noteId);

        return {
          notes: {
            ...notes,
            [note.bookId]: {
              ...notes[note.bookId],
              [note.pageNumber]: notes[note.bookId]?.[note.pageNumber]?.filter(
                (x) => x.noteId !== note.noteId,
              ),
            },
          },
        };
      }),
    setIsNoteVisible: (isNoteVisible: boolean) =>
      set(() => ({ isNoteVisible })),
    setIsEditing: (isEditing: boolean) => set(() => ({ isEditing })),
    resetNotesStore: () => set(() => initialNoteState),
  };
};

export const useNotesStore = createWithEqualityFn<TNotesStore>(
  createStore,
  shallow,
);
