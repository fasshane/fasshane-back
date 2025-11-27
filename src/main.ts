import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { ValidationPipe, Logger } from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

// Отримати дату/час у таймзоні Europe/Kyiv
const getKyivParts = () => {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? '00';

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
};

// Формат для Winston timestamp: [hh:mm:ss dd-mm-yyyy]
const timezoned = () => {
  const { year, month, day, hour, minute, second } = getKyivParts();
  return `[${hour}:${minute}:${second} ${day}-${month}-${year}]`;
};

async function bootstrap() {
  // root папка для логів
  const logsRootDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logsRootDir)) {
    fs.mkdirSync(logsRootDir, { recursive: true });
  }

  // Назва папки по дню (по Києву): YYYY-MM-DD
  const { year, month, day } = getKyivParts();
  const todayKyiv = `${year}-${month}-${day}`;
  const logsDir = path.join(logsRootDir, todayKyiv);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const appLogPath = path.join(logsDir, 'app.log');
  const errorLogPath = path.join(logsDir, 'error.log');

  // Роздільник між запусками в межах одного дня
  const runSeparator =
    '\n\n\n' +
    '================================ NEW RUN ================================\n' +
    `Started at ${timezoned()}\n` +
    '=======================================================================\n';

  fs.appendFileSync(appLogPath, runSeparator);
  fs.appendFileSync(errorLogPath, runSeparator);

  // Формат одного рядка лога:
  // [hh:mm:ss dd-mm-yyyy] [info] [Context] message
  const lineFormat = winston.format.printf(
    ({ timestamp, level, message, context, stack }) => {
      const ctx = context ? ` [${context}]` : '';
      const base = `${timestamp} [${level}]${ctx} ${message}`;
      return stack ? `${base}\n${stack}` : base;
    },
  );

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // Консоль
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: timezoned }),
            winston.format.colorize(),
            lineFormat,
          ),
        }),

        // Файл з усіма логами за день
        new winston.transports.File({
          filename: appLogPath,
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp({ format: timezoned }),
            lineFormat,
          ),
        }),

        // Файл тільки з помилками
        new winston.transports.File({
          filename: errorLogPath,
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp({ format: timezoned }),
            lineFormat,
          ),
        }),
      ],
    }),
  });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = env.PORT ?? 3001;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Server started on http://localhost:${port}`);
}

bootstrap();
