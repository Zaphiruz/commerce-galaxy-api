import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Building, BuildingSchema } from './schemas/building.entity';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Building.name, schema: BuildingSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingsModule {}