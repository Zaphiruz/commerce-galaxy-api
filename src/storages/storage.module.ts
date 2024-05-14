import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { Storage, StorageSchema } from './schemas/storage.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Storage.name, schema: StorageSchema }]),
    CaslModule,
    UsersModule,],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StoragesModule {}