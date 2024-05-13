import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { PlanetsModule } from './planets/planet.module';
import { UsersModule } from './users/user.module';
// import { ResourceController } from './resources/resource.controller';
import { BasesModule } from './bases/base.module';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.pgvfszf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName: process.env.DATABASE_NAME,
    }),
    UsersModule,
    PlanetsModule,
    BasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }