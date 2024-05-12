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
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger'

import { User } from './user.entity'
import { NewUserDto } from './new-user.dto'

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly UserRespository: MongoRepository<User>,
    ) { }

    @Get()
    @ApiOkResponse({ type: [User] })
    public async getAllUsers(): Promise<User[]> {
        return this.UserRespository.find();
    }

    @Get(':id')
    @ApiOkResponse({ type: User })
    public async getUserById(@Param('id') id: string): Promise<User> {
        return this.UserRespository.findOneBy({ _id: ObjectId.createFromHexString(id) });
    }

    @Post()
    @ApiOkResponse({ type: User })
    @ApiBadRequestResponse()
    public async createUser(@Body() user: NewUserDto): Promise<User> {
        if (!user) {
            throw new BadRequestException('request invalid');
        }
        return this.UserRespository.save(new User(user));
    }
}