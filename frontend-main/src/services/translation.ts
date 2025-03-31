import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const translateText = async (
  text: string,
  targetLang: 'en' | 'ar' | 'zh' | 'ja' | 'ms'
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/translate`, {
      text,
      targetLang,
    });
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '번역 중 오류가 발생했습니다.');
  }
};