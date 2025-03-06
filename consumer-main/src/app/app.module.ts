import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from 'src/queue/queue.module';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule, WebhookModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: +configService.get<number>('REDIS_PORT'),
          //   password: configService.get<string>('REDIS_PASSWORD'),
          //   maxRetriesPerRequest: null,
          //   enableReadyCheck: false,
        },
      }),
      inject: [ConfigService],
    }),
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
