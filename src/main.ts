import { CORS_OPTIONS } from './config/cors.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: CORS_OPTIONS,
    bufferLogs: false,

  });
  app.enableCors(CORS_OPTIONS);
  await app.listen(process.env.API_PORT);
}
bootstrap();
