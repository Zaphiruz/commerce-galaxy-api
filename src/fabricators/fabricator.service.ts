import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Fabricator } from './schemas/fabricator.schema';
import { NewFabricatorDto } from './dtos/create-fabricator.dto';
import { UpdateFabricatorDto } from './dtos/update-fabricator.dto';

@Injectable()
export class FabricatorService {
  constructor(
    @InjectModel(Fabricator.name) private fabricatorModel: Model<Fabricator>,
  ) {}

  async create(newFabricatorDto: NewFabricatorDto): Promise<Fabricator> {
    const createdCat = new this.fabricatorModel(newFabricatorDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Fabricator[]> {
    return this.fabricatorModel.find(query).exec();
  }

  async findOne(id: string): Promise<Fabricator> {
    return this.fabricatorModel.findById(id).exec();
  }

  async update(
    id: string,
    updateFabricatorDto: UpdateFabricatorDto,
  ): Promise<Fabricator> {
    return this.fabricatorModel.findByIdAndUpdate(
      id,
      { $set: updateFabricatorDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<Fabricator> {
    return this.fabricatorModel.findByIdAndDelete(id);
  }
}
