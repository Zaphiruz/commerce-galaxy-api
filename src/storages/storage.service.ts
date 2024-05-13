import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Storage } from './storage.entity';
import { NewStorageDto } from './new-storage.dto';
import { UpdateStorageDto } from './update-storage.dto';

@Injectable()
export class StorageService {
  constructor(@InjectModel(Storage.name) private storageModel: Model<Storage>) {}

  async create(newStorageDto: NewStorageDto): Promise<Storage> {
    const createdCat = new this.storageModel(newStorageDto);
    return createdCat.save();
  }

  async findAll(): Promise<Storage[]> {
    return this.storageModel.find().exec();
  }

  async findOne(id: string): Promise<Storage> {
    return this.storageModel.findById(id).exec();
  }

  async update(id: string, updateStorageDto: UpdateStorageDto): Promise<Storage> {
    return this.storageModel.findByIdAndUpdate(id, { "$set": updateStorageDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Storage> {
    return this.storageModel.findByIdAndDelete(id);
  }
}
