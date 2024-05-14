import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

import { FabricatorController } from './fabricator.controller';
import { FabricatorService } from './fabricator.service';
import { Fabricator, FabricatorSchema } from './schemas/fabricator.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fabricator.name, schema: FabricatorSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [FabricatorController],
  providers: [FabricatorService],
  exports: [FabricatorService],
})
export class FabricatorsModule {}