import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: delete it
  app.enableCors({
    origin: 'http://localhost:3000', // your React app origin
    credentials: true,               // allow cookies/auth headers
  });

  // app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = env.PORT ?? 3001;
  await app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}

bootstrap();
