import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Market } from './market.entity';
import { NewMarketDto } from './new-market.dto';
import { UpdateMarketDto } from './update-market.dto';

@Injectable()
export class MarketService {
  constructor(@InjectModel(Market.name) private marketModel: Model<Market>) {}

  async create(newMarketDto: NewMarketDto): Promise<Market> {
    const createdCat = new this.marketModel(newMarketDto);
    return createdCat.save();
  }

  async findAll(): Promise<Market[]> {
    return this.marketModel.find().exec();
  }

  async findOne(id: string): Promise<Market> {
    return this.marketModel.findById(id).exec();
  }

  async update(id: string, updateMarketDto: UpdateMarketDto): Promise<Market> {
    return this.marketModel.findByIdAndUpdate(id, { "$set": updateMarketDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Market> {
    return this.marketModel.findByIdAndDelete(id);
  }
}