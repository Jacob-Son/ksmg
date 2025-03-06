export type INote = {
  noteId: number;
  bookId: number;
  userAddress: string;
  pageNumber: number;
  notePositionX: number;
  notePositionY: number;
  noteContent: string;
  createdAt?: Date;
  updatedAt?: Date;
};
