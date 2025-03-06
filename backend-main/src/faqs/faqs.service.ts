import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFaqs() {
    return await this.prisma.faq.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async createFaq(title: string, content: string) {
    return await this.prisma.faq.create({
      data: {
        title,
        content,
      },
    });
  }

  async deleteFaq(faqId: string) {
    return await this.prisma.faq.delete({
      where: {
        faqId: Number(faqId),
      },
    });
  }
}
