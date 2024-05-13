import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Worker } from './worker.entity';
import { NewWorkerDto } from './new-worker.dto';
import { UpdateWorkerDto } from './update-worker.dto';

@Injectable()
export class WorkerService {
  constructor(@InjectModel(Worker.name) private workerModel: Model<Worker>) {}

  async create(newWorkerDto: NewWorkerDto): Promise<Worker> {
    const createdCat = new this.workerModel(newWorkerDto);
    let doc = await createdCat.save();
    return this.findOne(doc._id.toHexString()); // TODO refactor? did this to hide password
  }

  async findAll(): Promise<Worker[]> {
    return this.workerModel.find().exec();
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

  async findByWorkername(workername: string) {
    return this.workerModel.findOne({ workername });
  }
}
