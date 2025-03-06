import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotices() {
    const res = await this.prisma.notice.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res;
  }

  async createNotice(title: string, content: string) {
    return await this.prisma.notice.create({
      data: {
        title,
        content,
      },
    });
  }

  async deleteNotice(noticeId: string) {
    return await this.prisma.notice.delete({
      where: {
        noticeId: Number(noticeId),
      },
    });
  }
}
