import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common'
  import { InjectRepository } from '@nestjs/typeorm'
  import { MongoRepository } from 'typeorm'
  import { ObjectId } from 'mongodb'

  import { User } from './user.entity'
  
  @Controller('users')
  export class UserController {
    constructor(
      @InjectRepository(User)
      private readonly UserRespository: MongoRepository<User>,
    ) {}
  
    @Get()
    public async getAllUsers(): Promise<User[]> {
      return this.UserRespository.find();
    }

    @Get(':id')
    public async getUserById(@Param('id') id: string): Promise<User> {
        return this.UserRespository.findOneBy({ _id: ObjectId.createFromHexString(id) });
    }
  
    @Post()
    public async createUser(@Body() user: Partial<User>): Promise<User> {
      if (!user) {
        throw new BadRequestException('request invalid');
      }
      return this.UserRespository.save(new User(user));
    }
  }