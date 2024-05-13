import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { System } from './system.entity';
import { NewSystemDto } from './new-system.dto';
import { UpdateSystemDto } from './update-system.dto';

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<System>) {}

  async create(newSystemDto: NewSystemDto): Promise<System> {
    const createdCat = new this.systemModel(newSystemDto);
    return createdCat.save();
  }

  async findAll(): Promise<System[]> {
    return this.systemModel.find().exec();
  }

  async findOne(id: string): Promise<System> {
    return this.systemModel.findById(id).exec();
  }

  async update(id: string, updateSystemDto: UpdateSystemDto): Promise<System> {
    return this.systemModel.findByIdAndUpdate(id, { "$set": updateSystemDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<System> {
    return this.systemModel.findByIdAndDelete(id);
  }
}
