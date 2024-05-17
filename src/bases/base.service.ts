import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Base, BaseDocument } from './schemas/base.schema';
import { CreateBaseRequestDto } from './dtos/create-base.request';
import { UpdateBaseRequest } from './dtos/update-base.request.dto';
import { BuildingDocument } from 'src/buildings/schemas/building.schema';

@Injectable()
export class BaseService {
  constructor(@InjectModel(Base.name) private baseModel: Model<Base>) {}

  async create(createBaseDto: CreateBaseRequestDto): Promise<Base> {
    const createdCat = new this.baseModel(createBaseDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Base[]> {
    return this.baseModel
      .find(query)
      .populate('user')
      .populate('planet')
      .populate('buildings')
      .exec();
  }

  async findOne(id: string): Promise<Base> {
    return this.baseModel
      .findById(id)
      .populate('user')
      .populate('planet')
      .populate('buildings')
      .exec();
  }

  async update(
    id: string,
    updateBaseRequestDto: UpdateBaseRequest,
  ): Promise<Base> {
    return this.baseModel.findByIdAndUpdate(
      id,
      { $set: updateBaseRequestDto },
      { returnDocument: 'after' },
    );
  }

  async appendbuilding(
    id: string,
    building: BuildingDocument,
  ): Promise<BaseDocument> {
    const doc = await this.baseModel.findById(id).populate('buildings').exec();

    if (!doc) {
      throw new NotFoundException();
    }

    return this.baseModel.findByIdAndUpdate(
      id,
      { $set: { buildings: [...doc.buildings, building._id.toHexString()] } },
      { returnDocument: 'after' },
    );

    // doc.buildings.push(building);
    // return doc.save();
  }

  async delete(id: string): Promise<Base> {
    return this.baseModel.findByIdAndDelete(id);
  }
}
