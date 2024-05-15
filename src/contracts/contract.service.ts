import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Contract } from './schemas/contract.schema';
import { NewContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>) {}

  async create(newContractDto: NewContractDto): Promise<Contract> {
    const createdCat = new this.contractModel(newContractDto);
    return createdCat.save();
  }

  async findAll(query = null): Promise<Contract[]> {
    return this.contractModel.find(query).exec();
  }

  async findOne(id: string): Promise<Contract> {
    return this.contractModel.findById(id).exec();
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    return this.contractModel.findByIdAndUpdate(id, { "$set": updateContractDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<Contract> {
    return this.contractModel.findByIdAndDelete(id);
  }
}
