import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller';
import { PlanetController } from './planets/planet.controller';
import { Planet } from './planets/planet.entity';
import { UserController } from './users/user.controller';
import { User } from './users/user.entity';
import { ResourceController } from './resources/resource.controller';
import { Resource } from './resources/resource.entity';
import { BaseController } from './bases/base.controller';
import { Base } from './bases/base.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.pgvfszf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([Planet, User, Resource, Base]),
  ],
  controllers: [AppController, PlanetController, UserController, ResourceController, BaseController],
  providers: [AppService],
})
export class AppModule { }
