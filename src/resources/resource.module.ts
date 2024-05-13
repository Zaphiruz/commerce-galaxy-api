import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourcesModule {}