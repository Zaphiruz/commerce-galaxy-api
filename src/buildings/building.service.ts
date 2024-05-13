import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Building } from './schemas/building.entity';
import { NewBuildingDto } from './dtos/new-building.dto';
import { UpdateBuildingDto } from './dtos/update-building.dto';

@Injectable()
export class BuildingService {
  constructor(@InjectModel(Building.name) private buildingModel: Model<Building>) {}

  async create(newBuildingDto: NewBuildingDto): Promise<Building> {
    const createdCat = new this.buildingModel(newBuildingDto);
    return createdCat.save();
  }

  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }

  async findOne(id: string): Promise<Building> {
    return this.buildingModel.findById(id).exec();
  }

  async update(id: string, updateBuildingDto: UpdateBuildingDto): Promise<Building> {
    return this.buildingModel.findByIdAndUpdate(id, { "$set": updateBuildingDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Building> {
    return this.buildingModel.findByIdAndDelete(id);
  }
}
