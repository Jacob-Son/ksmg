// src/main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomAuthGuard } from './auth/custom-auth/custom.auth.guard';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  dotenv.config();
  ConfigModule.forRoot();
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new CustomAuthGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Wallet Relayer API')
    .setDescription('Wallet Relayer API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
