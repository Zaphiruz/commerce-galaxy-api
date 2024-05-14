import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Ship } from './schemas/ship.schema';
import { NewShipDto } from './dtos/create-ship.dto';
import { UpdateShipDto } from './dtos/update-ship.dto';

@Injectable()
export class ShipService {
  constructor(@InjectModel(Ship.name) private shipModel: Model<Ship>) {}

  async create(newShipDto: NewShipDto): Promise<Ship> {
    const createdCat = new this.shipModel({...newShipDto,});
    let doc = await createdCat.save();
    return this.findOne(doc._id.toHexString()); // TODO refactor? did this to hide password
  }

  async findAll(): Promise<Ship[]> {
    return this.shipModel.find().exec();
  }

  async findOne(id: string): Promise<Ship> {
    return this.shipModel.findById(id).exec();
  }

  async update(id: string, updateShipDto: UpdateShipDto): Promise<Ship> {
    return this.shipModel.findByIdAndUpdate(id, { "$set": updateShipDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Ship> {
    return this.shipModel.findByIdAndDelete(id);
  }

  async findByShipname(shipname: string) {
    return this.shipModel.findOne({ shipname });
  }
}
