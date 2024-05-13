import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Resource } from './resource.entity';
import { NewResourceDto } from './new-resource.dto';
import { UpdateResourceDto } from './update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(@InjectModel(Resource.name) private resourceModel: Model<Resource>) {}

  async create(newResourceDto: NewResourceDto): Promise<Resource> {
    const createdCat = new this.resourceModel(newResourceDto);
    return createdCat.save();
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().exec();
  }

  async findOne(id: string): Promise<Resource> {
    return this.resourceModel.findById(id).exec();
  }

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    return this.resourceModel.findByIdAndUpdate(id, { "$set": updateResourceDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Resource> {
    return this.resourceModel.findByIdAndDelete(id);
  }
}
