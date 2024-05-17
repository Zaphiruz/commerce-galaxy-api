import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { config } from 'dotenv';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import 'reflect-metadata';

config();

import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { createLogger } from './logger/winston.logger';

async function bootstrap() {
	const adapter = new ExpressAdapter();
	adapter.set('trust proxy', 1);

	const app = await NestFactory.create(AppModule, adapter, {
		bufferLogs: true,
	});

	app.useLogger(
		WinstonModule.createLogger({
			instance: createLogger(),
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Commerce Galaxy Api')
		.setDescription('The Commerce Galaxy Api description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.enableVersioning({
		type: VersioningType.URI,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			enableDebugMessages: true,
			forbidUnknownValues: true,
			whitelist: true,
			validationError: {
				target: true,
				value: true,
			},
		}),
	);

	app.useGlobalInterceptors(new LoggingInterceptor());

	app.use(compression());

	app.use(helmet());

	app.enableCors({
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		origin: [
			'https://*.commercegalaxy.online',
			'https://commercegalaxy.online',
			'http://localhost:3000',
			'http://localhost:8080',
		],
	});

	await app.listen(8081);
}
bootstrap();
