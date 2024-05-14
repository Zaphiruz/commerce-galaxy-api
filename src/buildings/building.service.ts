import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Building } from './schemas/building.entity';
import { CreateBuildingRequestDto } from './dtos/create-building.request.dto';
import { UpdateBuildingRequestDto } from './dtos/update-building.request.dto';

@Injectable()
export class BuildingService {
  constructor(@InjectModel(Building.name) private buildingModel: Model<Building>) {}

  async create(createBuildingRequestDto: CreateBuildingRequestDto): Promise<Building> {
    const createdCat = new this.buildingModel(createBuildingRequestDto);
    return createdCat.save();
  }

  async findAll(): Promise<Building[]> {
    return this.buildingModel.find().exec();
  }

  async findOne(id: string): Promise<Building> {
    return this.buildingModel.findById(id).exec();
  }

  async update(id: string, updateBuildingRequestDto: UpdateBuildingRequestDto): Promise<Building> {
    return this.buildingModel.findByIdAndUpdate(id, { "$set": updateBuildingRequestDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Building> {
    return this.buildingModel.findByIdAndDelete(id);
  }
}
