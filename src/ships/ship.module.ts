import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { Ship, ShipSchema } from './ship.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ship.name, schema: ShipSchema }])],
  controllers: [ShipController],
  providers: [ShipService],
  exports: [ShipService],
})
export class ShipsModule {}