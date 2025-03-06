import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get('/')
  @ApiTags('faqs')
  async getFaqs() {
    const res = await this.faqsService.getFaqs();
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Post('/')
  @ApiTags('faqs')
  async createFaq(
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const res = await this.faqsService.createFaq(title, content);
    return {
      success: true,
      error: null,
      data: res,
    };
  }

  @Delete('/:faqId')
  @ApiTags('faqs')
  async deleteFaq(@Param('faqId') faqId: string) {
    const res = await this.faqsService.deleteFaq(faqId);
    return {
      success: true,
      error: null,
      data: res,
    };
  }
}
