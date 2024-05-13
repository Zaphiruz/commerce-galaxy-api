import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { Worker, WorkerSchema } from './worker.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Worker.name, schema: WorkerSchema }])],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkersModule {}