import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://cluster0.pgvfszf.mongodb.net`,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      appname: 'Cluster0',
      w: 'majority',
      retryWrites: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
