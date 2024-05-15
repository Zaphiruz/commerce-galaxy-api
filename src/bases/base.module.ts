import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { Base, BaseSchema } from './schemas/base.schema';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Base.name, schema: BaseSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [BaseController],
  providers: [BaseService],
  exports: [BaseService],
})
export class BasesModule {}
