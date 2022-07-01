import { CORS_OPTIONS } from './config/cors.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: CORS_OPTIONS,
    bufferLogs: false,

  });

  const config = new DocumentBuilder()
    .setTitle('Backend Liven Tech API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors(CORS_OPTIONS);
  await app.listen(process.env.API_PORT);
}
bootstrap();
