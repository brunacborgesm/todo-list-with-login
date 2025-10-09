import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.enableCors({
  origin: process.env.WEB_ORIGIN?.split(",") ?? ["http://localhost:3000"],
  credentials: true,
});

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT || 3001);
  console.log(`API on http://localhost:${process.env.PORT || 3001}`);
}
bootstrap();
