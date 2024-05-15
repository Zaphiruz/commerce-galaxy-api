import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Planet } from './schemas/planet.schema';
import { CreatePlanetRequestDto } from './dtos/create-planet.request.dto';
import { UpdatePlanetRequestDto } from './dtos/update-planet.request.dto';

@Injectable()
export class PlanetService {
  constructor(@InjectModel(Planet.name) private planetModel: Model<Planet>) {}

  async create(createPlanetRequestDto: CreatePlanetRequestDto): Promise<Planet> {
    const createdCat = new this.planetModel(createPlanetRequestDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Planet[]> {
    return this.planetModel.find(query).exec();
  }

  async findOne(id: string): Promise<Planet> {
    return this.planetModel.findById(id).exec();
  }

  async update(id: string, updatePlanetRequestDto: UpdatePlanetRequestDto): Promise<Planet> {
    return this.planetModel.findByIdAndUpdate(id, { "$set": updatePlanetRequestDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Planet> {
    return this.planetModel.findByIdAndDelete(id);
  }
}
