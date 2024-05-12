import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { config } from 'dotenv';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Commerce Galaxy Api')
    .setDescription('The Commerce Galaxy Api description')
    .setVersion('1.0')
    .addTag('planets')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: true,
    forbidUnknownValues: true,
    whitelist: true,
    validationError: {
      target: true,
      value: true,
    },
  }));

  app.use(compression());

  app.use(helmet());

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DEL'],
    origin: ['http://localhost:3000', 'http://localhost:8080']
  });

  await app.listen(8081);
}
bootstrap();
