import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, hashPassword } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.request.dto';
import { UpdateUserDto } from './dtos/update-user.request.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel({ ...createUserDto, roles: []});
    return createdCat.save();
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
