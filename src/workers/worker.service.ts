import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Worker } from './schemas/worker.schema';
import { NewWorkerDto } from './dtos/create-worker.request.dto';
import { UpdateWorkerDto } from './dtos/update-worker.request.dto';

@Injectable()
export class WorkerService {
  constructor(@InjectModel(Worker.name) private workerModel: Model<Worker>) {}

  async create(createWorkerDto: NewWorkerDto): Promise<Worker> {
    const createdCat = new this.workerModel({...createWorkerDto,});
    return createdCat.save(); 
  }

  async findAll(query = null): Promise<Worker[]> {
    return this.workerModel.find(query).exec();
  }

  async findOne(id: string): Promise<Worker> {
    return this.workerModel.findById(id).exec();
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    return this.workerModel.findByIdAndUpdate(id, { "$set": updateWorkerDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Worker> {
    return this.workerModel.findByIdAndDelete(id);
  }

  async findByName(name: string) {
    return this.workerModel.findOne({ name });
  }
}
