import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { PlanetsModule } from './planets/planet.module';
import { UsersModule } from './users/user.module';
import { ResourcesModule } from './resources/resource.module';
import { BasesModule } from './bases/base.module';
import { BuildingsModule } from './buildings/building.module';
import { RecipeModule } from './recipes/recipe.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.pgvfszf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName: process.env.DATABASE_NAME,
    }),
    AuthModule,
    UsersModule,
    PlanetsModule,
    BasesModule,
    ResourcesModule,
    BuildingsModule,
    RecipeModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }