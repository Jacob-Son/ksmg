import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { SUPPORTED_LANGUAGES, TargetLanguage } from './translation.constants';

@Controller('translate')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  async translateText(
    @Body() body: { text: string; targetLang: TargetLanguage },
  ): Promise<{ translatedText: string }> {
    if (!body.text || !body.targetLang) {
      throw new HttpException(
        { message: 'Text and target language are required' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const translatedText = await this.translationService.translate(
        body.text,
        body.targetLang,
      );
      return { translatedText };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Translation failed',
          details: error.message,
          supportedLanguages: Object.values(SUPPORTED_LANGUAGES),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
