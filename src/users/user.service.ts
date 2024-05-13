import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.entity';
import { NewUserDto } from './new-user.dto';
import { UpdaetUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(newUserDto: NewUserDto): Promise<User> {
    const createdCat = new this.userModel(newUserDto);
    return createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdaetUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { "$set": updateUserDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
