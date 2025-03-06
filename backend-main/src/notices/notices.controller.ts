import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get('/')
  async getNotices() {
    const res = await this.noticesService.getNotices();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Post('/')
  async createNotice(
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const res = await this.noticesService.createNotice(title, content);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Delete('/:noticeId')
  async deleteNotice(@Param('noticeId') noticeId: string) {
    const res = await this.noticesService.deleteNotice(noticeId);
    return {
      success: true,
      error: null,
      data: res,
    };
  }
}
