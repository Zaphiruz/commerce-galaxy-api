import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Contract } from './contract.entity';
import { NewContractDto } from './new-contract.dto';
import { UpdateContractDto } from './update-contract.dto';

@Injectable()
export class ContractService {
  constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>) {}

  async create(newContractDto: NewContractDto): Promise<Contract> {
    const createdCat = new this.contractModel(newContractDto);
    return createdCat.save();
  }

  async findAll(): Promise<Contract[]> {
    return this.contractModel.find().exec();
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