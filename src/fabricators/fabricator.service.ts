import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Fabricator } from './fabricator.entity';
import { NewFabricatorDto } from './new-fabricator.dto';
import { UpdateFabricatorDto } from './update-fabricator.dto';

@Injectable()
export class FabricatorService {
  constructor(@InjectModel(Fabricator.name) private fabricatorModel: Model<Fabricator>) {}

  async create(newFabricatorDto: NewFabricatorDto): Promise<Fabricator> {
    const createdCat = new this.fabricatorModel(newFabricatorDto);
    return createdCat.save();
  }

  async findAll(): Promise<Fabricator[]> {
    return this.fabricatorModel.find().exec();
  }

  async findOne(id: string): Promise<Fabricator> {
    return this.fabricatorModel.findById(id).exec();
  }

  async update(id: string, updateFabricatorDto: UpdateFabricatorDto): Promise<Fabricator> {
    return this.fabricatorModel.findByIdAndUpdate(id, { "$set": updateFabricatorDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Fabricator> {
    return this.fabricatorModel.findByIdAndDelete(id);
  }
}
