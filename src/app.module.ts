import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlanetsModule } from './planets/planet.module';
import { UsersModule } from './users/user.module';
import { ResourcesModule } from './resources/resource.module';
import { BasesModule } from './bases/base.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.pgvfszf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName: process.env.DATABASE_NAME,
    }),
    UsersModule,
    PlanetsModule,
    BasesModule,
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }