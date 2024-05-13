import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, hashPassword } from './schemas/user.schema';
import { NewUserDto } from './dtos/new-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(newUserDto: NewUserDto): Promise<User> {
    const createdCat = new this.userModel({ ...newUserDto, isAdmin: false});
    let doc = await createdCat.save();
    return this.findOne(doc._id.toHexString()); // TODO refactor? did this to hide password
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    return this.userModel.findByIdAndUpdate(id, { "$set": updateUserDto }, { returnDocument: 'after' });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
