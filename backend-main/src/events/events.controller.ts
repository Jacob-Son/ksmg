import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { EventType, UserRole } from '@prisma/client';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { uploadFile } from 'src/common/services/image';
import { Roles } from 'src/roles/roles.decorator';

@Controller('events')
@UseGuards(RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  @ApiTags('events')
  @ApiOperation({
    summary: 'Get events',
    description: '이벤트들을 가져옵니다.',
  })
  async getEvents(@Query('page') page: string) {
    const events = await this.eventsService.getEvents(page ? Number(page) : 1);
    return {
      success: true,
      error: null,
      data: events,
    };
  }

  @Get('/:eventId')
  @ApiTags('events')
  @ApiOperation({
    summary: 'Get event',
    description: '이벤트를 가져옵니다.',
  })
  @ApiParam({
    name: 'eventId',
    description: '이벤트 아이디',
    required: true,
  })
  async getEvent(@Param('eventId') eventId: string) {
    const event = await this.eventsService.getEvent(eventId);
    return {
      success: true,
      error: null,
      data: event,
    };
  }

  @Post('/')
  @ApiTags('events')
  @ApiOperation({
    summary: 'Create event',
    description: '이벤트를 생성합니다.',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'detailImage', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @Roles(UserRole.ADMIN)
  async createEvent(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('image') image: any,
    @Body('detailImage') detailImage: any,
    @Body('externalUrl') externalUrl: string,
    @Body('eventType') eventType: EventType,
    @Body('startDay') startDay: Date,
    @Body('endDay') endDay: Date,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const imagePath = await uploadFile(files['image'][0], 'events/image');
      const detailImagePath = await uploadFile(
        files['detailImage'][0],
        'events/detailImage',
      );
      const event = await this.eventsService.createEvent(
        title,
        description,
        imagePath,
        detailImagePath,
        externalUrl,
        eventType,
        startDay,
        endDay,
      );
      return {
        success: true,
        error: null,
        data: event,
      };
    } catch (e) {
      return {
        success: false,
        error: '이벤트를 생성하는데 실패했습니다.',
        data: null,
      };
    }
  }

  @Delete('/:eventId')
  @ApiTags('events')
  @ApiOperation({
    summary: 'Delete event',
    description: '이벤트를 삭제합니다.',
  })
  @ApiParam({
    name: 'eventId',
    description: '이벤트 아이디',
    required: true,
  })
  async deleteEvent(@Param('eventId') eventId: string) {
    const res = await this.eventsService.deleteEvent(eventId);
    return {
      success: res.success,
      error: res.error,
      data: null,
    };
  }
}
