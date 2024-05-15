import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Base } from './schemas/base.schema';
import { CreateBaseRequestDto } from './dtos/create-base.request';
import { UpdateBaseRequest } from './dtos/update-base.request.dto';

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
      .exec();
  }

  async findOne(id: string): Promise<Base> {
    return this.baseModel
      .findById(id)
      .populate('user')
      .populate('planet')
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

  async delete(id: string): Promise<Base> {
    return this.baseModel.findByIdAndDelete(id);
  }
}
