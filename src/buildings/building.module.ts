import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building, BuildingSchema } from './building.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Building.name, schema: BuildingSchema }])],
  controllers: [BuildingController],
  providers: [BuildingService],
})
export class BuildingsModule {}