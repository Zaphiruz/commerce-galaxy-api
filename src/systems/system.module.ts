import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { System, SystemSchema } from './schemas/system.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: System.name, schema: SystemSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService],
})
export class SystemsModule {}