import { Injectable } from '@nestjs/common';
import { Event, EventType } from '@prisma/client';
import { convertPathToUrl } from 'src/common/services/image';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEvents(page: number): Promise<{
    events: Event[];
    totalCount: number;
    totalPage: number;
  }> {
    try {
      const take = 12;
      const skip = (page - 1) * take;
      const events = await this.prisma.event.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take,
        skip,
      });
      const totalCount = await this.prisma.event.count();
      const totalPage = Math.ceil(totalCount / take);
      const imageFormatedEvents = events.map((event) => {
        return {
          ...event,
          imagePath: convertPathToUrl(event.imagePath),
          detailImagePath: convertPathToUrl(event.detailImagePath),
        };
      });
      return {
        events: imageFormatedEvents,
        totalCount,
        totalPage,
      };
    } catch (e) {
      console.log(e);
      return {
        events: [],
        totalCount: 0,
        totalPage: 0,
      };
    }
  }

  async getEvent(eventId: string): Promise<Event> {
    try {
      const res = await this.prisma.event.findUnique({
        where: {
          eventId: Number(eventId),
        },
      });
      return {
        ...res,
        imagePath: convertPathToUrl(res.imagePath),
        detailImagePath: convertPathToUrl(res.detailImagePath),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async createEvent(
    title: string,
    description: string,
    imagePath: string,
    detailImagePath: string,
    externalUrl: string,
    eventType: EventType,
    startDay: Date,
    endDay: Date,
  ): Promise<Event> {
    try {
      const event = await this.prisma.event.create({
        data: {
          title,
          description,
          imagePath,
          detailImagePath,
          externalUrl,
          eventType,
          startDay,
          endDay,
        },
      });
      return event;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteEvent(
    eventId: string,
  ): Promise<{ success: boolean; error: string }> {
    try {
      await this.prisma.event.delete({
        where: {
          eventId: Number(eventId),
        },
      });
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: '이벤트를 삭제하는데 실패했습니다.',
      };
    }
  }
}
