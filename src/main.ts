import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import { config } from 'dotenv';
import helmet from 'helmet';

config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(compression());

  app.use(helmet());

  app.enableCors({
    methods: ['GET', 'POST', 'PUT'],
    origin: ['http://localhost:3000', 'http://localhost:8080']
  });

  await app.listen(8081);
}
bootstrap();
