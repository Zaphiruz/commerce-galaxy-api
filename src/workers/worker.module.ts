import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/user.module';

import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { Worker, WorkerSchema } from './schemas/worker.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Worker.name, schema: WorkerSchema }]),
    CaslModule,
    UsersModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkersModule {}