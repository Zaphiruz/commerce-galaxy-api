import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Catalog } from './schemas/catalog.schema';
import { NewCatalogDto } from './dtos/create-catalog.dto';
import { UpdateCatalogDto } from './dtos/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>,
  ) {}

  async create(newCatalogDto: NewCatalogDto): Promise<Catalog> {
    const createdCat = new this.catalogModel(newCatalogDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Catalog[]> {
    return this.catalogModel.find(query).exec();
  }

  async findOne(id: string): Promise<Catalog> {
    return this.catalogModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<Catalog> {
    return this.catalogModel.findByIdAndUpdate(
      id,
      { $set: updateCatalogDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<Catalog> {
    return this.catalogModel.findByIdAndDelete(id);
  }
}
