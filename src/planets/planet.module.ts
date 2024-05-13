import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';
import { Planet, PlanetSchema } from './planet.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }])],
  controllers: [PlanetController],
  providers: [PlanetService],
})
export class PlanetsModule {}