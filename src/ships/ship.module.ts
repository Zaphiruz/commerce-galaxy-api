import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { Ship, ShipSchema } from './schemas/ship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ship.name, schema: ShipSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [ShipController],
  providers: [ShipService],
  exports: [ShipService],
})
export class ShipsModule {}
