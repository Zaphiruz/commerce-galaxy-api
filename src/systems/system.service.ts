import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { System } from './schemas/system.schema';
import { NewSystemDto } from './dtos/create-system.dto';
import { UpdateSystemDto } from './dtos/update-system.dto';

@Injectable()
export class SystemService {
  constructor(@InjectModel(System.name) private systemModel: Model<System>) {}

  async create(newSystemDto: NewSystemDto): Promise<System> {
    const createdCat = new this.systemModel(newSystemDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<System[]> {
    return this.systemModel.find(query).exec();
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
