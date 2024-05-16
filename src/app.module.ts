import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { PlanetsModule } from './planets/planet.module';
import { UsersModule } from './users/user.module';
import { ResourcesModule } from './resources/resource.module';
import { BasesModule } from './bases/base.module';
import { BuildingsModule } from './buildings/building.module';
import { RecipeModule } from './recipes/recipe.module';
import { WorkersModule } from './workers/worker.module';
import { SystemsModule } from './systems/system.module';
import { MarketsModule } from './markets/market.module';
import { ContractsModule } from './contracts/contract.module';
import { FabricatorsModule } from './fabricators/fabricator.module';
import { ShipsModule } from './ships/ship.module';
import { StoragesModule } from './storages/storage.module';
import { NotesModule } from './notes/note.module';
import { CatalogsModule } from './catalogs/catalog.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.pgvfszf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        dbName: process.env.DATABASE_NAME,
      },
    ),
    AuthModule,
    UsersModule,
    PlanetsModule,
    BasesModule,
    ResourcesModule,
    BuildingsModule,
    WorkersModule,
    SystemsModule,
    MarketsModule,
    ContractsModule,
    FabricatorsModule,
    ShipsModule,
    StoragesModule,
    NotesModule,
    RecipeModule,
    CatalogsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
