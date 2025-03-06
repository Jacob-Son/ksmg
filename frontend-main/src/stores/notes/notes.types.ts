import { INote } from '~/types/note';

export type TNotes = {
  [bookId: number]: {
    [pageNumber: number]: INote[];
  };
};

export type TNotesStore = {
  notes: TNotes;
  isNoteVisible: boolean;
  isEditing: boolean;
  setNotes: (notes: INote[]) => void;
  addNote: (note: INote) => void;
  updateNote: (note: INote) => void;
  deleteNote: (note: INote) => void;
  setIsNoteVisible: (isNoteVisible: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  resetNotesStore: () => void;
};
