import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { System, SystemSchema } from './system.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemsModule {}