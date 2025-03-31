import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SUPPORTED_LANGUAGES, TargetLanguage } from './translation.constants';

@Injectable()
export class TranslationService {
  constructor(private configService: ConfigService) {}

  private get apiKey(): string {
    return this.configService.get<string>('GOOGLE_TRANSLATE_API_KEY');
  }

  async translate(
    text: string,
    targetLang: TargetLanguage,
    sourceLang: string = SUPPORTED_LANGUAGES.KOREAN,
  ): Promise<string> {
    if (!Object.values(SUPPORTED_LANGUAGES).includes(targetLang)) {
      throw new Error(`Unsupported target language: ${targetLang}`);
    }

    try {
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {
          q: text,
          target: targetLang,
          source: sourceLang, // 명시적으로 소스 언어 지정
        },
        { params: { key: this.apiKey } },
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      throw new Error(
        `Translation failed: ${
          error.response?.data?.error?.message || error.message
        }`,
      );
    }
  }
}
