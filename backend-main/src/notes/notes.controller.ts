import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  createNoteResponse,
  deleteNoteResponse,
  getNotesResponse,
  updateNoteResponse,
} from './swagger/response';
import { ApiResponseType } from 'src/common/types/api';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { noteIdParam } from './swagger/param';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  CreateNoteResponseData,
  GetNotesResponseData,
  UpdateNoteResponseData,
} from './type/response';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { UserRole } from '@prisma/client';
import { GetNoteImageDto } from './dto/get-note-image.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('notes')
@UseGuards(RolesGuard)
export class NotesController {
  constructor(
    private readonly noteService: NotesService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  @ApiTags('notes')
  @ApiOperation({
    summary: 'Get notes',
    description: '노트들을 가져옵니다.',
  })
  @ApiResponse(getNotesResponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async getNotes(
    @Query() query: GetNoteImageDto,
  ): Promise<ApiResponseType<GetNotesResponseData>> {
    const result = await this.noteService.getNotes(
      Number(query.bookId),
      query.userAddress,
      Number(query.pageNumber),
    );
    return {
      success: result.success,
      error: result.error,
      data: {
        notes: result.data,
      },
    };
  }

  @Post('/')
  @ApiTags('notes')
  @ApiOperation({
    summary: 'Create note',
    description: '노트를 생성합니다.',
  })
  @ApiResponse(createNoteResponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async createNote(
    @Body() body: CreateNoteDto,
  ): Promise<ApiResponseType<CreateNoteResponseData>> {
    const result = await this.noteService.createNote(
      Number(body.bookId),
      body.userAddress,
      body.pageNumber,
      body.notePosition,
      body.noteContent,
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Patch('/:id')
  @ApiTags('notes')
  @ApiOperation({
    summary: 'Update note',
    description: '노트를 수정합니다.',
  })
  @ApiParam(noteIdParam)
  @ApiResponse(updateNoteResponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async updateNote(
    @Headers('authorization') authorization: string,
    @Param('id') noteId: string,
    @Body() body: UpdateNoteDto,
  ): Promise<ApiResponseType<UpdateNoteResponseData>> {
    const user = await this.authService.getUser(authorization);
    const isOwner = await this.noteService.checkNoteOwnership(
      Number(noteId),
      user.userAddress,
    );
    if (!isOwner) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.noteService.updateNote(
      Number(noteId),
      body.notePosition,
      body.noteContent,
    );
    return {
      success: result.success,
      error: result.error,
      data: result.data,
    };
  }

  @Delete('/:id')
  @ApiTags('notes')
  @ApiOperation({
    summary: 'Delete note',
    description: '노트를 삭제합니다.',
  })
  @ApiParam(noteIdParam)
  @ApiResponse(deleteNoteResponse)
  @Roles(UserRole.ADMIN, UserRole.CREATOR, UserRole.USER)
  async deleteNote(
    @Headers('authorization') authorization: string,
    @Param('id') noteId: string,
  ): Promise<ApiResponseType<null>> {
    const user = await this.authService.getUser(authorization);
    const isOwner = await this.noteService.checkNoteOwnership(
      Number(noteId),
      user.userAddress,
    );
    if (!isOwner) {
      return {
        success: false,
        error: '권한이 없습니다.',
        data: null,
      };
    }
    const result = await this.noteService.deleteNote(Number(noteId));
    return {
      success: result.success,
      error: result.error,
      data: null,
    };
  }
}
