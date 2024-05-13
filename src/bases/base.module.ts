import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { Base, BaseSchema } from './base.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Base.name, schema: BaseSchema }])],
  controllers: [BaseController],
  providers: [BaseService],
})
export class BasesModule {}