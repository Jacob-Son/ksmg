import { Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}
  async getNotes(
    bookId: number,
    userAddress: string,
    pageNumber: number,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: Note[] | null;
  }> {
    try {
      const note = await this.prisma.note.findMany({
        where: {
          bookId,
          userAddress,
          pageNumber,
        },
      });
      return {
        success: true,
        error: null,
        data: note,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Can't get notes",
        data: null,
      };
    }
  }

  async createNote(
    bookId: number,
    userAddress: string,
    pageNumber: number,
    notePosition: {
      x: number;
      y: number;
    },
    noteContent: string,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: Note | null;
  }> {
    try {
      const note = await this.prisma.note.create({
        data: {
          bookId,
          userAddress,
          pageNumber,
          notePositionX: notePosition.x,
          notePositionY: notePosition.y,
          noteContent,
        },
      });
      return {
        success: true,
        error: null,
        data: note,
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Can't create note",
        data: null,
      };
    }
  }
  async updateNote(
    noteId: number,
    notePosition: {
      x: number;
      y: number;
    },
    noteContent: string,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: Note;
  }> {
    try {
      const note = await this.prisma.note.findUnique({
        where: {
          noteId,
        },
      });
      if (!note) {
        return {
          success: false,
          error: 'Note not found',
          data: null,
        };
      }

      try {
        const note = await this.prisma.note.update({
          where: {
            noteId,
          },
          data: {
            notePositionX: notePosition.x,
            notePositionY: notePosition.y,
            noteContent: noteContent,
          },
        });
        return {
          success: true,
          error: null,
          data: note,
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          error: "Can't update note",
          data: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Can't update note",
        data: null,
      };
    }
  }
  async deleteNote(noteId: number): Promise<{
    success: boolean;
    error: string | null;
  }> {
    try {
      const note = await this.prisma.note.findUnique({
        where: {
          noteId,
        },
      });
      if (!note) {
        return {
          success: false,
          error: 'Note not found',
        };
      } else {
        await this.prisma.note.delete({
          where: {
            noteId,
          },
        });
        return {
          success: true,
          error: null,
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Can't delete note",
      };
    }
  }

  async checkNoteOwnership(
    noteId: number,
    userAddress: string,
  ): Promise<{
    success: boolean;
    error: string | null;
    data: boolean;
  }> {
    try {
      const note = await this.prisma.note.findUnique({
        where: {
          noteId,
        },
      });
      if (!note) {
        return {
          success: false,
          error: 'Note not found',
          data: false,
        };
      } else {
        if (note.userAddress === userAddress) {
          return {
            success: true,
            error: null,
            data: true,
          };
        } else {
          return {
            success: true,
            error: null,
            data: false,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Can't check note ownership",
        data: false,
      };
    }
  }
}
