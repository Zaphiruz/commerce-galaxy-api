import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';
import { Planet, PlanetSchema } from './schemas/planet.schema';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [PlanetController],
  providers: [PlanetService],
  exports: [PlanetService],
})
export class PlanetsModule {}
