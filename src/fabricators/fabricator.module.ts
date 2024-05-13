import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FabricatorController } from './fabricator.controller';
import { FabricatorService } from './fabricator.service';
import { Fabricator, FabricatorSchema } from './fabricator.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fabricator.name, schema: FabricatorSchema }])],
  controllers: [FabricatorController],
  providers: [FabricatorService],
})
export class FabricatorsModule {}