import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Resource } from './schemas/resource.schema';
import { NewResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(@InjectModel(Resource.name) private resourceModel: Model<Resource>) {}

  async create(newResourceDto: NewResourceDto): Promise<Resource> {
    const createdCat = new this.resourceModel(newResourceDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Resource[]> {
    return this.resourceModel.find(query).exec();
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
