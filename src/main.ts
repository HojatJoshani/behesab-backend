// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // فعال کردن CORS به صورت کامل (برای توسعه)
  app.enableCors({
    origin: 'http://localhost:3000', // یا '*' برای همه دامین‌ها (توصیه نمی‌شود در پروداکشن)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
