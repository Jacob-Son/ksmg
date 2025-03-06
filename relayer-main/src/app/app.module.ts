import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { SignerModule } from 'src/signer/signer.module';
import { TxProducerModule } from 'src/tx-producer/tx-producer.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from 'src/tx-producer/tasks/tasks.module';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     store: 'redis',
    //     host: configService.get<string>('REDIS_HOST'),
    //     port: +configService.get<number>('REDIS_PORT'),
    //     //   password: configService.get<string>('REDIS_PASSWORD'),
    //     //   maxRetriesPerRequest: null,
    //     //   enableReadyCheck: false,
    //   }),
    //   inject: [ConfigService],
    // }),
    CacheModule.register({
      isGlobal: true,
    }), // not using redis now
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
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
    UsersModule,
    AuthModule,
    SignerModule,
    TxProducerModule,
    TasksModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
