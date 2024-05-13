import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Planet } from './planet.entity';
import { NewPlanetDto } from './new-planet.dto';
import { UpdatePlanetDto } from './update-planet.dto';

@Injectable()
export class PlanetService {
  constructor(@InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  async create(newPlanetDto: NewPlanetDto): Promise<Planet> {
    const createdCat = new this.planetModel(newPlanetDto);
    return createdCat.save();
  }

  async findAll(): Promise<Planet[]> {
    return this.planetModel.find().exec();
  }

  async findOne(id: string): Promise<Planet> {
    return this.planetModel.findById(id).exec();
  }

  async update(id: string, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    return this.planetModel.findByIdAndUpdate(id, { "$set": updatePlanetDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Planet> {
    return this.planetModel.findByIdAndDelete(id);
  }
}
