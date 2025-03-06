import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebhookService } from './webhook.service';

@Controller('webhook')
@ApiTags('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('mined-transaction')
  getAlchemyWebhookMinedTransaction(@Body() payload: any) {
    return this.webhookService.getAlchemyWebhookMinedTransaction(payload);
  }

  @Post('graphql')
  getAlchemyWebhookGraphql(@Body() payload: any) {
    return this.webhookService.getAlchemyWebhookGraphql(payload);
  }
}
