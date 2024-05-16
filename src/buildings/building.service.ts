import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Building } from './schemas/building.entity';
import { CreateBuildingRequestDto } from './dtos/create-building.request.dto';
import { UpdateBuildingRequestDto } from './dtos/update-building.request.dto';
import { BaseService } from 'src/bases/base.service';

@Injectable()
export class BuildingService {
  constructor(
    @InjectModel(Building.name) private buildingModel: Model<Building>,
    private readonly baseService: BaseService,
  ) {}

  async create(
    createBuildingRequestDto: CreateBuildingRequestDto,
  ): Promise<Building> {
    const createdCat = new this.buildingModel(createBuildingRequestDto);
    const doc = await createdCat.save();
    await this.baseService.appendbuilding(createBuildingRequestDto.base, doc);
    return doc;
  }

  async findAll(query = null): Promise<Building[]> {
    return this.buildingModel.find(query).populate('base').exec();
  }

  async findOne(id: string): Promise<Building> {
    return this.buildingModel.findById(id).populate('base').exec();
  }

  async update(
    id: string,
    updateBuildingRequestDto: UpdateBuildingRequestDto,
  ): Promise<Building> {
    return this.buildingModel.findByIdAndUpdate(
      id,
      { $set: updateBuildingRequestDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<Building> {
    return this.buildingModel.findByIdAndDelete(id);
  }
}
