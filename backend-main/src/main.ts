import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // CORS 설정
  const corsOptions = {
    origin: '*',
  };
  app.enableCors(corsOptions);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('ebook API')
    .setVersion('1.0')
    .addTag('ebook')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // await app.listen(8080);
  await app.listen(8080, '0.0.0.0'); // 외부 접속 허용
}
bootstrap();
