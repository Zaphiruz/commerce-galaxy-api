import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Base } from './base.entity';
import { NewBaseDto } from './new-base.dto';
import { UpdateBaseDto } from './update-base.dto';

@Injectable()
export class BaseService {
  constructor(@InjectModel(Base.name) private baseModel: Model<Base>) {}

  async create(newBaseDto: NewBaseDto): Promise<Base> {
    const createdCat = new this.baseModel(newBaseDto);
    return createdCat.save();
  }

  async findAll(): Promise<Base[]> {
    return this.baseModel.find().exec();
  }

  async findOne(id: string): Promise<Base> {
    return this.baseModel.findById(id).exec();
  }

  async update(id: string, updateBaseDto: UpdateBaseDto): Promise<Base> {
    return this.baseModel.findByIdAndUpdate(id, { "$set": updateBaseDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Base> {
    return this.baseModel.findByIdAndDelete(id);
  }
}
